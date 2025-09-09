import Header from "../reusables/Header";
import AboutSection from "../reusables/AboutSection";
import { useState, useEffect } from "react";
import BookingItem from "../reusables/BookingItem";

const EventDisplayPage = ({ mode }) => {
  const [venues, setVenues] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bookedLocations, setBookedLocations] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      const data = await res.json(); // expect ["HALL", "EXCURSION", ...]
      setUnitTypes(data);
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje tipova jedinica.");
    }
  };

  // Fetch available locations for selected venue & date
  const fetchAvailableLocations = async (venueId, date) => {
    if (!venueId || !date) return;
    try {
      const res = await fetch(
        `http://localhost:9000/api/venues/${venueId}/locations/available?date=${encodeURIComponent(date)}`
      );
      if (!res.ok) throw new Error("Failed to fetch available locations");
      const data = await res.json();
      setAvailableLocations(data);
      setBookedLocations([]); // reset booked locations
    } catch (err) {
      console.error(err);
      setError("Neuspešno učitavanje slobodnih lokacija.");
    }
  };

  useEffect(() => {
    fetchVenues();
    fetchUnitTypes();
  }, []);

  // Refetch locations when venue or date changes
  useEffect(() => {
    if (venueId && date) {
      // Validate date format: dd.mm.yyyy and future date
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

  // Update organization units for a location
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
      id: null,
      name,
      date,
      description,
      venueId: parseInt(venueId),
      bookedLocations,
    };

    try {
      const res = await fetch("http://localhost:9000/api/events/create", {
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
          title="Stranica za događaj"
          description="Ovde možete napraviti događaj"
        />

        <div className="main-content">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

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

            <h3>Dostupne lokacije</h3>
            {availableLocations.length === 0 && <p>Nema dostupnih lokacija.</p>}
            {availableLocations.map((loc) => (
              <BookingItem
                key={loc.id}
                location={loc}
                booking={bookedLocations.find((b) => b.locationId === loc.id)}
                onToggle={() => toggleBooking(loc)}
                onUpdateUnits={(units) => updateOrganizationUnits(loc.id, units)}
                unitTypes={unitTypes}
              />
            ))}

            <div style={{ marginTop: 12 }}>
              <button type="submit">💾 Sačuvaj</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventDisplayPage;





