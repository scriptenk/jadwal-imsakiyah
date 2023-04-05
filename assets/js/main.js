// ==================
// === Star decor ===
// ==================


let stateId =
  "%2F3sM%2BuQyYUEpEKzZXZ7E5w7WPYs5rhjiD%2FVDOKmW5jF0KTSu%2FP17rwFivdZ5VsHOSgA2dxJ58urghNHh6ws4%2Fg%3D%3D";
let cityId =
  "VLQMpXZBwV5mBZIrgDyVFzeryCExP2SOooEaaiWJz%2F1Tnr54251IjyyZu%2Fe39yQCcPGZlTynHWb2UkiRcdgSAA%3D%3D";

// =============================
// === do this on first load ===
// =============================
window.onload = function () {
  getStatesList();
  getCityList(stateId);
  getDataTime(stateId, cityId);
};

// =============================
// === function getStateList ===
// =============================
function getStatesList() {
  fetch("https://imsakiyah-api.santrikoding.com/state")
    .then((response) => response.json())
    .then((result) => showStatesList(result.data));
}

// ==============================
// === function showStateList ===
// ==============================
function showStatesList(data) {
  const stateList = document.querySelector(".state-list");

  data.forEach((state) => {
    if (state.name == "PUSAT") return;
    if (state.name == "DKI JAKARTA") {
      stateId = state.id;
    }
    let selected = state.name == "DKI JAKARTA" ? "selected" : "";
    let newOptionElement = `<option value="${state.id}_${state.name}" ${selected}>${state.name}</option>`;

    stateList.insertAdjacentHTML("beforeend", newOptionElement);
  });
}

// ============================
// === function changeState ===
// ============================

function changeState(el) {
  const loading = document.querySelector(".loading");
  loading.classList.remove("d-none");

  let stateText = document.querySelector(".state");
  let state = el.value.split("_")[1];
  stateText.innerHTML = state;

  stateId = el.value.split("_")[0];
  getCityList(stateId);
  // getDataTime(stateId, cityId);
}

// =============================
// === function getCityList ====
// =============================
function getCityList(stateId) {
  stateId = [...stateId]
    .map((item) => {
      if (item == "%") return "%25";
      else return item;
    })
    .join("");
  fetch(`https://imsakiyah-api.santrikoding.com/city?state=${stateId}`)
    .then((response) => response.json())
    .then((result) => {
      console.log("stateId : ", stateId);
      //   console.log(result.data);
      showCityList(result.data);
    });
}

// ==============================
// === function showCityList ===
// ==============================
function showCityList(data) {
  const cityList = document.querySelector(".city-list");
  cityList.innerHTML = "";

  data.forEach((city) => {
    if (city.name == "KOTA JAKARTA") {
      cityId = city.id;
    }
    let selected = city.name == "KOTA JAKARTA" ? "selected" : "";
    let newOptionElement = `<option value="${city.id}_${city.name}" ${selected}>${city.name}</option>`;

    cityList.insertAdjacentHTML("beforeend", newOptionElement);
  });

  let cityText = document.querySelector(".city");
  let city = cityList.value.split("_")[1];
  cityText.innerHTML = city;

  cityId = document.querySelector(".city-list").value.split("_")[0];
  getDataTime(stateId, cityId);
}

// ============================
// === function changeCity ===
// ============================
function changeCity(el) {
  const loading = document.querySelector(".loading");
  loading.classList.remove("d-none");

  let cityText = document.querySelector(".city");
  let city = el.value.split("_")[1];
  cityText.innerHTML = city;

  cityId = el.value.split("_")[0];
  getDataTime(stateId, cityId);
}

// ============================
// === function getDataTime ===
// ============================
function getDataTime(stateId, cityId) {
  stateId = [...stateId]
    .map((item) => {
      if (item == "%") return "%25";
      else return item;
    })
    .join("");
  cityId = [...cityId]
    .map((item) => {
      if (item == "%") return "%25";
      else return item;
    })
    .join("");
  console.log("cityId : ", cityId);
  fetch(
    `https://imsakiyah-api.santrikoding.com/imsyakiyah?state=${stateId}&city=${cityId}&year=2023`
  )
    .then((response) => response.json())
    .then((result) => renderCard(result.data))
    .catch((e) => console.log(e));
}

// ================================
// === function renderCard ===
// ================================
function renderCard(data) {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";

  data.forEach((time, i) => {
    // const newRow = `<tr>
    //     <th>${i + 1} <br> Ramadhan 1444 H</th>
    //     <td>${time.date}</td>
    //     <td>${time.imsak}</td>
    //     <td>${time.subuh}</td>
    //     <td>${time.dzuhur}</td>
    //     <td>${time.ashar}</td>
    //     <td>${time.maghrib}</td>
    //     <td>${time.isya}</td>
    //     </tr>`;

    const newCard = `
    <div class="col-10 col-md-4 mb-4">
            <div class=" card card-time">
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">${i + 1} Ramadhan 1444 H</h5>
                <h6 class="card-subtitle mb-3">
                ${time.date}
                </h6>
                <div class="row">
                  <div class="col-4">
                    <p class="title-time fw-bold">Imsak</p>
                    <p class="time">${time.imsak}</p>
                  </div>
                  <div class="col-4">
                    <p class="title-time fw-bold">Subuh</p>
                    <p class="time">${time.subuh}</p>
                  </div>
                  <div class="col-4">
                    <p class="title-time fw-bold">Dzuhur</p>
                    <p class="time">${time.dzuhur}</p>
                  </div>
                  <div class="col-4">
                    <p class="title-time fw-bold">Ashar</p>
                    <p class="time">${time.ashar}</p>
                  </div>
                  <div class="col-4">
                    <p class="title-time fw-bold">Maghrib</p>
                    <p class="time">${time.maghrib}</p>
                  </div>
                  <div class="col-4">
                    <p class="title-time fw-bold">Isya</p>
                    <p class="time">${time.isya}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    cardsContainer.insertAdjacentHTML("beforeend", newCard);
  });

  const loading = document.querySelector(".loading");
  loading.classList.add("d-none");
}
