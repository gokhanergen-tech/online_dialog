import React from "react";
import InterContent from "../../components/interviews_base/interContent";
const Interviews = () => {
  return (
    <InterContent>
      <div class="card p-4 mt-3 bg-danger">
        <div class="first">
          <h6 class="heading text-primary">Exquisite hand henna tattoo</h6>
          <div class="time d-flex flex-row align-items-center justify-content-between mt-3">
            <div class="d-flex align-items-center">
            </div>
            <div>
          
            </div>
          </div>
        </div>
        <div class="second d-flex flex-row mt-2">
          <div class="image mr-3 border border-light rounded-circle">
            {" "}
            <img
              src="/images/office.png"
              class="rounded-circle"
              width="60"
            />{" "}
          </div>
          <div class=" align-self-center m-3 ml-1">
           fdgfdgsdfgf
          </div>
        </div>

      
        <div class="third mt-4">
          {" "}
          <button class="btn btn-success btn-block">
             Book Now
          </button>
        </div>
      </div>
    </InterContent>
  );
};

export default Interviews;
