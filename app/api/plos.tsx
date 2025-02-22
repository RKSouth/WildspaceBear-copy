"use client";

const coreFetches = {
  // this function will get patient information from the patientInfo endpoint
  getCoreData: async (searchValue: any) => {
    const response = await fetch(
      `https://api.plos.org/search?q=title:${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.response.docs;
  },
};

export default coreFetches;
