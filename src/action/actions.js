// import axios from "axios";

export const FETCH_NAV_REQUEST = "FETCH_NAV_REQUEST";
export const FETCH_NAV_SUCCESS = "FETCH_NAV_SUCCESS";
export const FETCH_NAV_FAILURE = "FETCH_NAV_FAILURE";

export const fetchNavRequest = () => ({
  type: FETCH_NAV_REQUEST,
});

export const fetchNavSuccess = (navData) => ({
  type: FETCH_NAV_SUCCESS,
  payload: navData,
});

export const fetchNavFailure = (error) => ({
  type: FETCH_NAV_FAILURE,
  payload: error,
});

export const fetchNavData = () => async (dispatch) => {
  dispatch(fetchNavRequest());

  try {
    // const response = await axios.get(
    //   "https://www.amfiindia.com/spages/NAVAll.txt?t=18022020035513"
    // );

    const response = {
      data: `Mirae Asset Mutual Fund
 
      118859;INF769K01CM1;-;Mirae Asset Liquid Fund - Direct Plan - Growth;2517.3449;28-Jan-2024
      118862;-;INF769K01CP4;Mirae Asset Liquid Fund - Direct Plan - Weekly IDCW;1217.1353;28-Jan-2024
      118861;-;INF769K01CO7;Mirae Asset Liquid Fund - Direct Plan -Daily IDCW;1075.8332;28-Jan-2024
      118860;INF769K01CN9;INF769K01CQ2;Mirae Asset Liquid Fund - Direct Plan -Monthly IDCW;1135.5186;28-Jan-2024
      111647;-;INF769K01804;Mirae Asset Liquid Fund - Regular - Daily IDCW;1066.4347;28-Jan-2024
      111646;INF769K01788;-;Mirae Asset Liquid Fund - Regular Plan - Growth;2478.2732;28-Jan-2024
      111645;INF769K01838;INF769K01820;Mirae Asset Liquid Fund - Regular Plan - Monthly IDCW;1153.2297;28-Jan-2024
      111644;-;INF769K01812;Mirae Asset Liquid Fund - Regular Plan - Weekly IDCW;1153.4288;28-Jan-2024
       
      Motilal Oswal Mutual Fund
       
      145834;INF247L01734;-;Motilal Oswal Liquid Fund - Direct Growth;12.6694;28-Jan-2024
      145946;INF247L01726;-;Motilal Oswal Liquid Fund - Regular Growth;12.5726;28-Jan-2024
      147442;-;-;Motilal Oswal Liquid Fund - Unclaimed Dividend - Greater than 3 years;10.0000;28-Jan-2024
      147441;-;-;Motilal Oswal Liquid Fund - Unclaimed Dividend- Upto 3 years;12.3136;28-Jan-2024
      147443;-;-;Motilal Oswal Liquid Fund - Unclaimed Redemption - Greater than 3 years;10.0000;28-Jan-2024
      147444;-;-;Motilal Oswal Liquid Fund - Unclaimed Redemption - Upto 3 years;12.0870;28-Jan-2024
      146218;INF247L01791;INF247L01783;Motilal Oswal Liquid Fund Direct - IDCW  Quarterly Payout/Reinvestment;10.0592;28-Jan-2024
      146226;-;INF247L01759;Motilal Oswal Liquid Fund Direct - IDCW Fortnightly Reinvestment;10.0328;28-Jan-2024
      146223;INF247L01775;INF247L01767;Motilal Oswal Liquid Fund Direct - IDCW Monthly Payout/Reinvestment;10.0860;28-Jan-2024
      146228;-;INF247L01742;Motilal Oswal Liquid Fund Direct - IDCW Reinvestment;10.0077;28-Jan-2024
      146229;-;INF247L01809;Motilal Oswal Liquid Fund Direct - IDCW Weekly Reinvestment;10.0223;28-Jan-2024
      146227;-;INF247L01817;Motilal Oswal Liquid Fund Regular - IDCW Daily Reinvestment;10.0055;28-Jan-2024
      146230;-;INF247L01825;Motilal Oswal Liquid Fund Regular - IDCW Fortnightly Reinvestment;10.0319;28-Jan-2024
      146220;INF247L01841;INF247L01833;Motilal Oswal Liquid Fund Regular - IDCW Monthly Payout/Reinvestment;10.0847;28-Jan-2024
      146222;INF247L01866;INF247L01858;Motilal Oswal Liquid Fund Regular - IDCW Quarterly Payout/Reinvestment;10.0581;28-Jan-2024
      146224;-;INF247L01874;Motilal Oswal Liquid Fund Regular - IDCW Weekly Reinvestment;10.0290;28-Jan-2024`,
    };
    const navData = processNavData(response.data);

    dispatch(fetchNavSuccess(navData));
  } catch (error) {
    dispatch(fetchNavFailure(error.message));
  }
};

const processNavData = (rawData) => {
  const processedData = parseMutualFundsData(rawData);
  console.log(processedData);

  return processedData;
};

export const parseMutualFundsData = (rawData) => {
  const mutualFunds = [];
  let currentFund = {};

  rawData.split("\n").forEach((line) => {
    if (line.trim() === "") {
      return;
    }

    const tokens = line.split(";");

    if (tokens.length === 6) {
      if (Object.keys(currentFund).length !== 0) {
        mutualFunds.push(currentFund);
      }

      currentFund = {
        fundCode: tokens[0] ? tokens[0].trim() : "",
        planCode: tokens[1],
        reinvestCode: tokens[2],
        fundName: tokens[3],
        nav: tokens[4],
        date: tokens[5],
      };
    } else if (tokens.length === 3) {
      currentFund.reinvestCode = tokens[0];
      currentFund.nav = tokens[1];
      currentFund.date = tokens[2];
    }
  });

  if (Object.keys(currentFund).length !== 0) {
    mutualFunds.push(currentFund);
  }

  return mutualFunds;
};
