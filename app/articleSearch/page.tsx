"use client";

import SignOut from "@/components/sign-out";
import React, { useState } from "react";
import coreFetches from "../api/plos";

export default function ArticleSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [plosData, setPlosData] = useState([]);

  function handleSearch() {
    (async function initialCoreFetch() {
      try {
        const plosDataRaw = await coreFetches.getCoreData(searchValue);

        let plosTitleHolder: any = [];
        let urlArray: any = [];

        for (let i = 0; i < plosDataRaw.length; i++) {
          urlArray.push(
            "https://journals.plos.org/plosone/article?id=" +
              plosDataRaw[i].id.toString()
          );

          plosTitleHolder.push(plosDataRaw[i].title_display.toString());
        }
        const arrayToObject = (plosTitleHolder: any, urlArray: any) => {
          let obj: any = [];
          for (let i = 0; i < plosTitleHolder.length; i++) {
            obj[i] = { title: plosTitleHolder[i], link: urlArray[i] };
          }
          return obj;
        };

        const obj = arrayToObject(plosTitleHolder, urlArray);
        setPlosData(obj);
      } catch (err) {
        console.error(err);
      }
    })();
  }

  return (
    <div className="w-screen flex flex-col space-y-5 items-center text-beige">
      <p>Search by topic</p>
      <input
        className="text-black"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      ></input>
      <button onClick={handleSearch}>GO!</button>

      {plosData.length ? (
        <table className="border-white border-4 text-white">
          <tbody>
            <tr>
              <th>title</th>
              <th>Download</th>
            </tr>

            {plosData.map((results: any) => (
              <tr className=".p-3 m-3" key={plosData[1]}>
                <td>{results.title}</td>
                <td>
                  <a href={results.link}>Go Read it!</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>try searching again</p>
      )}
    </div>
  );
}
