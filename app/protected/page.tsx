"use client";

import SignOut from "@/components/sign-out";
import { SetStateAction, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import ArticleSearch from "../articleSearch/page";
import { profile } from "console";

export default function Home() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const router = useRouter();
  const [searchClicked, setSearchClicked] = useState(false);
  const [savedClicked, setSavedClicked] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login"); // Redirect to login if no token found
      return;
    }

    // Decode the JWT token (Example using JSON)
    try {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUser({ id: userData.id, email: userData.email });
    } catch (error) {
      localStorage.removeItem("authToken");
      router.push("/login");
    }
  }, [router]);

  function handleSearchClicked(e: any) {
    if (searchClicked) {
      setSearchClicked(false);
    } else {
      setSearchClicked(true);
      setProfileClicked(false);
      setSavedClicked(false);
      setSelectedBtn(e.target.id);
    }
  }

  function handleSavedClicked(e: any) {
    if (savedClicked) {
      setSavedClicked(false);
    } else {
      setSavedClicked(true);
      setSearchClicked(false);
      setProfileClicked(false);
      setSelectedBtn(e.target.id);
    }
  }
  function handleProfileClicked(e: any) {
    if (profileClicked) {
      setProfileClicked(false);
    } else {
      setSavedClicked(false);
      setProfileClicked(true);
      setSearchClicked(false);
      setSelectedBtn(e.target.id);
    }
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 my-96 items-center text-white">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              id="btn1"
              onClick={handleSearchClicked}
              className={
                selectedBtn === "btn1"
                  ? "inline-block p-4 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              Search
            </button>
          </li>
          <li className="mr-2">
            <button
              id="btn2"
              onClick={handleSavedClicked}
              className={
                selectedBtn === "btn2"
                  ? "inline-block p-4 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              Saved
            </button>
          </li>
          <li className="mr-2">
            <button
              id="btn3"
              onClick={handleProfileClicked}
              className={
                selectedBtn === "btn3"
                  ? "inline-block p-4 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            >
              Profile
            </button>
          </li>
        </ul>

        {searchClicked ? <ArticleSearch /> : null}
        {savedClicked ? <p>Saved</p> : null}
        {profileClicked ? <p>Profile</p> : null}
        <SignOut />
      </div>
    </div>
  );
}
