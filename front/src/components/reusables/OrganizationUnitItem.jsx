import React from "react";

const OrganizationUnitItem = ({ unit, unitTypes = [], onChange, onRemove }) => {
    return (
        <div className="organization-unit-item" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
            <input
                type="text"
                placeholder="Naziv jedinice"
                value={unit.name}
                onChange={(e) => onChange("name", e.target.value)}
            />
            <input
                type="number"
                placeholder="Kapacitet"
                value={unit.capacity}
                onChange={(e) => {
                    const val = e.target.value;
                    onChange("capacity", val === "" ? "" : parseInt(val, 10));
                }}
                style={{ width: 100 }}
            />


            <select value={unit.unitType || ""} onChange={(e) => onChange("unitType", e.target.value)}>
                <option value="">-- Izaberi tip --</option>
                {unitTypes.map((t, idx) => (
                    <option key={idx} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <button type="button" onClick={onRemove}>
                ❌
            </button>
        </div>
    );
};

export default OrganizationUnitItem;




