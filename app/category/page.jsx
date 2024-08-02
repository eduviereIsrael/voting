"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  selectCategories,
  selectGeneralSubmit,
  selectGraduatesSubmit,
  selectUndergraduatesSubmit,
  clearVotes,
} from "@/lib/store/slices/category.slice";
import { useRouter } from "next/navigation";

const Page = () => {
  const categories = useAppSelector(selectCategories);
  const graduatesSubmit = useAppSelector(selectGraduatesSubmit);
  const generalSubmit = useAppSelector(selectGeneralSubmit);
  const undergraduatesSubmit = useAppSelector(selectUndergraduatesSubmit);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const navigateCategory = (x) => router.push(`/category/${x}?award=0`);

  const handleClearVotes = () => {
    dispatch(clearVotes());
  };

  return (
    <div className="vote-categories">
      {categories.graduate && (
        <div className="container">
          <div className="heading">
            <div className="text">
              <h1 className="title">Vote By Categories</h1>
              <p className="subtitle">Select a category</p>
            </div>
            <img src="/ules.svg" alt="" />
          </div>

          <div className="categories" onClick={handleClearVotes}>
            <div
              className="category"
              onClick={
                () => navigateCategory("graduate")
              }
            >
              <span className="category-name">
                GRADUATE <b>|</b>{" "}
                <span className="awards">
                  {" "}
                  {categories["graduate"].length} awards
                </span>
              </span>
              {graduatesSubmit ? (
                <span className="status" style={{ color: "#FF1000" }}>
                  voted
                </span>
              ) : (
                <span className="status">tap to vote</span>
              )}
              <div className="img">
                <img src="/right.svg" alt="" />
              </div>
              {/* <span className="awards">16 Awards</span> */}
            </div>
            <div
              className="category"
              onClick={
                () => navigateCategory("undergraduate")
              }
            >
              <span className="category-name">
                UNDERGRADUATE <b>|</b> {" "}
                <span className="awards">
                  {" "}
                  {categories["undergraduate"].length} awards
                </span>
              </span>
              {undergraduatesSubmit ? (
                <span className="status" style={{ color: "#FF1000" }}>
                  voted
                </span>
              ) : (
                <span className="status">tap to vote</span>
              )}
              <div className="img">
                <img src="/right.svg" alt="" />
              </div>
              {/* <span className="awards">15 Awards</span> */}
            </div>
            <div
              className="category"
              onClick={() => navigateCategory("general")}
            >
              <span className="category-name">
                GENERAL & MAIN <b>|</b>{" "}
                <span className="awards">
                  {" "}
                  {categories["general"].length} awards
                </span>
              </span>
              {generalSubmit ? (
                <span className="status" style={{ color: "#FF1000" }}>
                  voted
                </span>
              ) : (
                <span className="status">tap to vote</span>
              )}
              <div className="img">
                <img src="/right.svg" alt="" />
              </div>
              {/* <span className="awards">7 Awards</span> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
