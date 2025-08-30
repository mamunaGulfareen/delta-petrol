import React, { useState } from "react";
import { countryCodes } from "../utils/country";
function PhoneInput({ formData, setFormData }) {
    const [countryCode, setCountryCode] = useState("+1");

    const handlePhoneChange = (e) => {
        setFormData({
            ...formData,
            phone: countryCode + e.target.value.replace(/^0+/, ""),
        });
    };

    return (
        <div className="w-[303px]  !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
            <select
                value={countryCode}
                onChange={(e) => {
                    setCountryCode(e.target.value);
                    setFormData({
                        ...formData,
                        phone: e.target.value + formData.phone.replace(/^\+\d+/, ""),
                    });
                }}
                className="bg-white px-2 rounded-l-[12px] text-black poppins-medium text-[16px] focus:outline-none"
            >
                {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                        ({c.code})
                    </option>
                ))}
            </select>

            <input
                type="tel"
                placeholder="Phone"
                className="w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1] rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                onChange={handlePhoneChange}
            />
        </div>
    );
}

export default PhoneInput;
