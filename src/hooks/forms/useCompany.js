import { useState } from "react";

export function useCompany() {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState(0);

  const changeSelectCompany = (event) => {
    const val = event.target.value;
    setSelectCard();
    setCompanyId(val);
    setCompanyName(paymentMethods[val].hash_name);
    if (paymentMethods[val].type_accept == "card") {
      setIsCard(true);
    } else {
      setIsCard(false);
    }
  };

  return {
    companyName,
    setCompanyName,
    companyId,
    setCompanyId,
    changeSelectCompany,
  };
}
