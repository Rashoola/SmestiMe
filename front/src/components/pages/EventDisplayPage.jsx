import Header from "../reusables/Header";
import AboutSection from "../reusables/AboutSection";
import { useState, useEffect } from "react";
import BookingItem from "../reusables/BookingItem";
import { useParams } from "react-router-dom";

const EventDisplayPage = ({ mode }) => {
  const { id } = useParams(); // event id (only in edit mode)

  const [venues, setVenues] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [date, setDate] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bookedLocations, setBookedLocations] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(false);

  // Fetch venues
  const fetchVenues = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/venues");
      if (!res.ok) throw new Error("Failed to fetch venues");
      const data = await res.json();
      setVenues(data);
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje mesta.");
    }
  };

  // Fetch unit types
  const fetchUnitTypes = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/organization-units/types");
      if (!res.ok) throw new Error("Failed to fetch unit types");
      const data = await res.json();
      setUnitTypes(data);
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje tipova jedinica.");
    }
  };

  // Fetch available locations
  const fetchAvailableLocations = async (venueId, date) => {
    if (!venueId || !date) return;
    try {
      const res = await fetch(
        `http://localhost:9000/api/venues/${venueId}/locations/available?date=${encodeURIComponent(date)}`
      );
      if (!res.ok) throw new Error("Failed to fetch available locations");
      const data = await res.json();
      setAvailableLocations(data);
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje slobodnih lokacija.");
    }
  };

  // Fetch event when in edit mode
  const fetchEvent = async (eventId) => {
    setLoadingEvent(true);
    try {
      const res = await fetch(`http://localhost:9000/api/events/${eventId}`);
      if (!res.ok) throw new Error("Failed to fetch event");
      const data = await res.json();

      // Fill fields
      setName(data.name || "");
      setDescription(data.description || "");
      setDate(data.date || "");
      setVenueId(data.venueId?.toString() || "");

      // Prepare booked locations structure
      const mappedBookings = data.bookings.map((b) => ({
        id: b.id,
        locationId: b.locationId,
        organizationUnits: b.organizationUnits || [],
      }));
      setBookedLocations(mappedBookings);
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje događaja.");
    } finally {
      setLoadingEvent(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchVenues();
    fetchUnitTypes();
    if (mode === "edit" && id) {
      fetchEvent(id);
    }
  }, [mode, id]);

  // Refetch available locations when venue/date changes
  useEffect(() => {
    if (venueId && date) {
      const parts = date.split(".");
      if (parts.length === 3) {
        const [dd, mm, yyyy] = parts.map(Number);
        const inputDate = new Date(yyyy, mm - 1, dd);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (inputDate >= today) {
          fetchAvailableLocations(venueId, date);
          setError("");
        } else {
          setError("Datum mora biti budući datum.");
          setAvailableLocations([]);
        }
      } else {
        setError("Datum mora biti u formatu dd.mm.yyyy");
        setAvailableLocations([]);
      }
    }
  }, [venueId, date]);

  // Toggle booking of a location
  const toggleBooking = (location) => {
    setBookedLocations((prev) => {
      const exists = prev.find((b) => b.locationId === location.id);
      if (exists) return prev.filter((b) => b.locationId !== location.id);

      return [
        ...prev,
        { id: null, locationId: location.id, organizationUnits: [] },
      ];
    });
  };

  // Update organization units
  const updateOrganizationUnits = (locationId, units) => {
    setBookedLocations((prev) =>
      prev.map((b) =>
        b.locationId === locationId ? { ...b, organizationUnits: units } : b
      )
    );
  };

  // Save event
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name || !date || !venueId) {
      setError("Naziv, datum i mesto su obavezni.");
      return;
    }

    const payload = {
      id: mode === "edit" ? parseInt(id) : null,
      name,
      date,
      description,
      venueId: parseInt(venueId),
      bookedLocations,
      entryCode
    };
    console.log(payload);
    try {
      const url = "http://localhost:9000/api/events/save";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Neuspešno čuvanje događaja.");
      setMessage("Događaj uspešno sačuvan.");
      console.log("Saved event:", payload);
    } catch (err) {
      console.error(err);
      setError("Neuspešno čuvanje događaja.");
    }
  };

  return (
    <>
      <Header title="FON Event Manager" buttons={[]} />
      <div className="main">
        <AboutSection
          title={mode === "edit" ? "Izmena događaja" : "Kreiranje događaja"}
          description={
            mode === "edit"
              ? "Ovde možete izmeniti događaj"
              : "Ovde možete napraviti događaj"
          }
        />

        <div className="main-content">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          {loadingEvent && <p>Učitavanje događaja...</p>}

          {!loadingEvent && (
            <form onSubmit={handleSaveEvent}>
              <label>Naziv:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Opis:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Datum (dd.mm.yyyy):</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Mesto:</label>
              <select
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
              >
                <option value="">-- Odaberite mesto --</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <label>Šifra za ulaz:</label>
              <input
                type="text"
                value={entryCode}
                onChange={(e) => setEntryCode(e.target.value)}
              />

              <h3>Dostupne lokacije</h3>
              {availableLocations.length === 0 && (
                <p>Nema dostupnih lokacija.</p>
              )}
              {availableLocations.map((loc) => (
                <BookingItem
                  key={loc.id}
                  location={loc}
                  booking={bookedLocations.find((b) => b.locationId === loc.id)}
                  onToggle={() => toggleBooking(loc)}
                  onUpdateUnits={(units) =>
                    updateOrganizationUnits(loc.id, units)
                  }
                  unitTypes={unitTypes}
                />
              ))}

              <div style={{ marginTop: 12 }}>
                <button type="submit">💾 Sačuvaj</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDisplayPage;






