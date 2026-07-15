export interface StateData {
  id: string; // e.g., "NY"
  name: string; // e.g., "New York"
  capitol: string; // "Albany"
  topCities: string[]; // ["New York City", "Buffalo", "Rochester"]
  inStateUniversities: string[]; // ["Columbia University", "New York University"]
  outOfStateDistractor: { name: string; state: string; }; // e.g., { name: "Rutgers University", state: "NJ" }
}

export const statesData: StateData[] = [
  {
    id: "AL",
    name: "Alabama",
    capitol: "Montgomery",
    topCities: ["Birmingham", "Mobile", "Huntsville"],
    inStateUniversities: ["University of Alabama", "Auburn University"],
    outOfStateDistractor: { name: "University of Georgia", state: "GA" }
  },
  {
    id: "AK",
    name: "Alaska",
    capitol: "Juneau",
    topCities: ["Anchorage", "Fairbanks", "Badger"],
    inStateUniversities: ["University of Alaska Anchorage", "University of Alaska Fairbanks"],
    outOfStateDistractor: { name: "University of Washington", state: "WA" }
  },
  {
    id: "AZ",
    name: "Arizona",
    capitol: "Phoenix",
    topCities: ["Tucson", "Mesa", "Chandler"],
    inStateUniversities: ["University of Arizona", "Arizona State University"],
    outOfStateDistractor: { name: "University of Nevada, Las Vegas", state: "NV" }
  },
  {
    id: "AR",
    name: "Arkansas",
    capitol: "Little Rock",
    topCities: ["Fort Smith", "Fayetteville", "Springdale"],
    inStateUniversities: ["University of Arkansas", "Arkansas State University"],
    outOfStateDistractor: { name: "University of Memphis", state: "TN" }
  },
  {
    id: "CA",
    name: "California",
    capitol: "Sacramento",
    topCities: ["Los Angeles", "San Francisco", "San Diego"],
    inStateUniversities: ["Stanford University", "University of California, Berkeley"],
    outOfStateDistractor: { name: "University of Oregon", state: "OR" }
  },
  {
    id: "CO",
    name: "Colorado",
    capitol: "Denver",
    topCities: ["Colorado Springs", "Aurora", "Fort Collins"],
    inStateUniversities: ["University of Colorado Boulder", "Colorado State University"],
    outOfStateDistractor: { name: "University of Wyoming", state: "WY" }
  },
  {
    id: "CT",
    name: "Connecticut",
    capitol: "Hartford",
    topCities: ["Bridgeport", "New Haven", "Stamford"],
    inStateUniversities: ["Yale University", "University of Connecticut"],
    outOfStateDistractor: { name: "Brown University", state: "RI" }
  },
  {
    id: "DE",
    name: "Delaware",
    capitol: "Dover",
    topCities: ["Wilmington", "Newark", "Middletown"],
    inStateUniversities: ["University of Delaware", "Delaware State University"],
    outOfStateDistractor: { name: "University of Maryland", state: "MD" }
  },
  {
    id: "FL",
    name: "Florida",
    capitol: "Tallahassee",
    topCities: ["Jacksonville", "Miami", "Tampa"],
    inStateUniversities: ["University of Florida", "Florida State University"],
    outOfStateDistractor: { name: "University of Georgia", state: "GA" }
  },
  {
    id: "GA",
    name: "Georgia",
    capitol: "Atlanta",
    topCities: ["Augusta", "Columbus", "Savannah"],
    inStateUniversities: ["University of Georgia", "Emory University"],
    outOfStateDistractor: { name: "University of Florida", state: "FL" }
  },
  {
    id: "HI",
    name: "Hawaii",
    capitol: "Honolulu",
    topCities: ["East Honolulu", "Pearl City", "Hilo"],
    inStateUniversities: ["University of Hawaii at Manoa", "Hawaii Pacific University"],
    outOfStateDistractor: { name: "San Diego State University", state: "CA" }
  },
  {
    id: "ID",
    name: "Idaho",
    capitol: "Boise",
    topCities: ["Meridian", "Nampa", "Idaho Falls"],
    inStateUniversities: ["University of Idaho", "Boise State University"],
    outOfStateDistractor: { name: "Washington State University", state: "WA" }
  },
  {
    id: "IL",
    name: "Illinois",
    capitol: "Springfield",
    topCities: ["Chicago", "Aurora", "Rockford"],
    inStateUniversities: ["University of Chicago", "Northwestern University"],
    outOfStateDistractor: { name: "University of Wisconsin-Madison", state: "WI" }
  },
  {
    id: "IN",
    name: "Indiana",
    capitol: "Indianapolis",
    topCities: ["Fort Wayne", "Evansville", "South Bend"],
    inStateUniversities: ["Indiana University Bloomington", "Purdue University"],
    outOfStateDistractor: { name: "Ohio State University", state: "OH" }
  },
  {
    id: "IA",
    name: "Iowa",
    capitol: "Des Moines",
    topCities: ["Cedar Rapids", "Davenport", "Sioux City"],
    inStateUniversities: ["University of Iowa", "Iowa State University"],
    outOfStateDistractor: { name: "University of Minnesota", state: "MN" }
  },
  {
    id: "KS",
    name: "Kansas",
    capitol: "Topeka",
    topCities: ["Wichita", "Overland Park", "Kansas City"],
    inStateUniversities: ["University of Kansas", "Kansas State University"],
    outOfStateDistractor: { name: "University of Missouri", state: "MO" }
  },
  {
    id: "KY",
    name: "Kentucky",
    capitol: "Frankfort",
    topCities: ["Louisville", "Lexington", "Bowling Green"],
    inStateUniversities: ["University of Kentucky", "University of Louisville"],
    outOfStateDistractor: { name: "Indiana University Bloomington", state: "IN" }
  },
  {
    id: "LA",
    name: "Louisiana",
    capitol: "Baton Rouge",
    topCities: ["New Orleans", "Shreveport", "Lafayette"],
    inStateUniversities: ["Louisiana State University", "Tulane University"],
    outOfStateDistractor: { name: "University of Texas at Austin", state: "TX" }
  },
  {
    id: "ME",
    name: "Maine",
    capitol: "Augusta",
    topCities: ["Portland", "Lewiston", "Bangor"],
    inStateUniversities: ["University of Maine", "Bowdoin College"],
    outOfStateDistractor: { name: "University of New Hampshire", state: "NH" }
  },
  {
    id: "MD",
    name: "Maryland",
    capitol: "Annapolis",
    topCities: ["Baltimore", "Columbia", "Germantown"],
    inStateUniversities: ["Johns Hopkins University", "University of Maryland"],
    outOfStateDistractor: { name: "Georgetown University", state: "DC" }
  },
  {
    id: "MA",
    name: "Massachusetts",
    capitol: "Boston",
    topCities: ["Worcester", "Springfield", "Cambridge"],
    inStateUniversities: ["Harvard University", "Massachusetts Institute of Technology"],
    outOfStateDistractor: { name: "Yale University", state: "CT" }
  },
  {
    id: "MI",
    name: "Michigan",
    capitol: "Lansing",
    topCities: ["Detroit", "Grand Rapids", "Warren"],
    inStateUniversities: ["University of Michigan", "Michigan State University"],
    outOfStateDistractor: { name: "Ohio State University", state: "OH" }
  },
  {
    id: "MN",
    name: "Minnesota",
    capitol: "St. Paul",
    topCities: ["Minneapolis", "Rochester", "Duluth"],
    inStateUniversities: ["University of Minnesota", "Macalester College"],
    outOfStateDistractor: { name: "University of Wisconsin-Madison", state: "WI" }
  },
  {
    id: "MS",
    name: "Mississippi",
    capitol: "Jackson",
    topCities: ["Gulfport", "Southaven", "Biloxi"],
    inStateUniversities: ["University of Mississippi", "Mississippi State University"],
    outOfStateDistractor: { name: "University of Alabama", state: "AL" }
  },
  {
    id: "MO",
    name: "Missouri",
    capitol: "Jefferson City",
    topCities: ["Kansas City", "St. Louis", "Springfield"],
    inStateUniversities: ["Washington University in St. Louis", "University of Missouri"],
    outOfStateDistractor: { name: "University of Illinois", state: "IL" }
  },
  {
    id: "MT",
    name: "Montana",
    capitol: "Helena",
    topCities: ["Billings", "Missoula", "Great Falls"],
    inStateUniversities: ["University of Montana", "Montana State University"],
    outOfStateDistractor: { name: "University of Idaho", state: "ID" }
  },
  {
    id: "NE",
    name: "Nebraska",
    capitol: "Lincoln",
    topCities: ["Omaha", "Bellevue", "Grand Island"],
    inStateUniversities: ["University of Nebraska-Lincoln", "Creighton University"],
    outOfStateDistractor: { name: "University of Iowa", state: "IA" }
  },
  {
    id: "NV",
    name: "Nevada",
    capitol: "Carson City",
    topCities: ["Las Vegas", "Henderson", "Reno"],
    inStateUniversities: ["University of Nevada Reno", "University of Nevada Las Vegas"],
    outOfStateDistractor: { name: "University of Utah", state: "UT" }
  },
  {
    id: "NH",
    name: "New Hampshire",
    capitol: "Concord",
    topCities: ["Manchester", "Nashua", "East Concord"],
    inStateUniversities: ["University of New Hampshire", "Dartmouth College"],
    outOfStateDistractor: { name: "University of Vermont", state: "VT" }
  },
  {
    id: "NJ",
    name: "New Jersey",
    capitol: "Trenton",
    topCities: ["Newark", "Jersey City", "Paterson"],
    inStateUniversities: ["Princeton University", "Rutgers University"],
    outOfStateDistractor: { name: "Columbia University", state: "NY" }
  },
  {
    id: "NM",
    name: "New Mexico",
    capitol: "Santa Fe",
    topCities: ["Albuquerque", "Las Cruces", "Rio Rancho"],
    inStateUniversities: ["University of New Mexico", "New Mexico State University"],
    outOfStateDistractor: { name: "University of Arizona", state: "AZ" }
  },
  {
    id: "NY",
    name: "New York",
    capitol: "Albany",
    topCities: ["New York City", "Buffalo", "Rochester"],
    inStateUniversities: ["Columbia University", "New York University"],
    outOfStateDistractor: { name: "Rutgers University", state: "NJ" }
  },
  {
    id: "NC",
    name: "North Carolina",
    capitol: "Raleigh",
    topCities: ["Charlotte", "Greensboro", "Durham"],
    inStateUniversities: ["Duke University", "University of North Carolina at Chapel Hill"],
    outOfStateDistractor: { name: "University of South Carolina", state: "SC" }
  },
  {
    id: "ND",
    name: "North Dakota",
    capitol: "Bismarck",
    topCities: ["Fargo", "Grand Forks", "Minot"],
    inStateUniversities: ["University of North Dakota", "North Dakota State University"],
    outOfStateDistractor: { name: "South Dakota State University", state: "SD" }
  },
  {
    id: "OH",
    name: "Ohio",
    capitol: "Columbus",
    topCities: ["Cleveland", "Cincinnati", "Toledo"],
    inStateUniversities: ["Ohio State University", "Case Western Reserve University"],
    outOfStateDistractor: { name: "University of Michigan", state: "MI" }
  },
  {
    id: "OK",
    name: "Oklahoma",
    capitol: "Oklahoma City",
    topCities: ["Tulsa", "Norman", "Broken Arrow"],
    inStateUniversities: ["University of Oklahoma", "Oklahoma State University"],
    outOfStateDistractor: { name: "University of Texas at Austin", state: "TX" }
  },
  {
    id: "OR",
    name: "Oregon",
    capitol: "Salem",
    topCities: ["Portland", "Eugene", "Gresham"],
    inStateUniversities: ["University of Oregon", "Oregon State University"],
    outOfStateDistractor: { name: "University of Washington", state: "WA" }
  },
  {
    id: "PA",
    name: "Pennsylvania",
    capitol: "Harrisburg",
    topCities: ["Philadelphia", "Pittsburgh", "Allentown"],
    inStateUniversities: ["University of Pennsylvania", "Penn State University"],
    outOfStateDistractor: { name: "Princeton University", state: "NJ" }
  },
  {
    id: "RI",
    name: "Rhode Island",
    capitol: "Providence",
    topCities: ["Cranston", "Warwick", "Pawtucket"],
    inStateUniversities: ["Brown University", "University of Rhode Island"],
    outOfStateDistractor: { name: "University of Connecticut", state: "CT" }
  },
  {
    id: "SC",
    name: "South Carolina",
    capitol: "Columbia",
    topCities: ["Charleston", "North Charleston", "Mount Pleasant"],
    inStateUniversities: ["University of South Carolina", "Clemson University"],
    outOfStateDistractor: { name: "University of Georgia", state: "GA" }
  },
  {
    id: "SD",
    name: "South Dakota",
    capitol: "Pierre",
    topCities: ["Sioux Falls", "Rapid City", "Aberdeen"],
    inStateUniversities: ["University of South Dakota", "South Dakota State University"],
    outOfStateDistractor: { name: "North Dakota State University", state: "ND" }
  },
  {
    id: "TN",
    name: "Tennessee",
    capitol: "Nashville",
    topCities: ["Memphis", "Knoxville", "Chattanooga"],
    inStateUniversities: ["Vanderbilt University", "University of Tennessee"],
    outOfStateDistractor: { name: "University of Kentucky", state: "KY" }
  },
  {
    id: "TX",
    name: "Texas",
    capitol: "Austin",
    topCities: ["Houston", "Dallas", "San Antonio"],
    inStateUniversities: ["University of Texas at Austin", "Texas A&M University"],
    outOfStateDistractor: { name: "University of Oklahoma", state: "OK" }
  },
  {
    id: "UT",
    name: "Utah",
    capitol: "Salt Lake City",
    topCities: ["West Valley City", "Provo", "West Jordan"],
    inStateUniversities: ["University of Utah", "Brigham Young University"],
    outOfStateDistractor: { name: "University of Nevada, Las Vegas", state: "NV" }
  },
  {
    id: "VT",
    name: "Vermont",
    capitol: "Montpelier",
    topCities: ["Burlington", "South Burlington", "Rutland"],
    inStateUniversities: ["University of Vermont", "Middlebury College"],
    outOfStateDistractor: { name: "Dartmouth College", state: "NH" }
  },
  {
    id: "VA",
    name: "Virginia",
    capitol: "Richmond",
    topCities: ["Virginia Beach", "Norfolk", "Chesapeake"],
    inStateUniversities: ["University of Virginia", "Virginia Tech"],
    outOfStateDistractor: { name: "University of Maryland", state: "MD" }
  },
  {
    id: "WA",
    name: "Washington",
    capitol: "Olympia",
    topCities: ["Seattle", "Spokane", "Tacoma"],
    inStateUniversities: ["University of Washington", "Washington State University"],
    outOfStateDistractor: { name: "University of Oregon", state: "OR" }
  },
  {
    id: "WV",
    name: "West Virginia",
    capitol: "Charleston",
    topCities: ["Huntington", "Morgantown", "Parkersburg"],
    inStateUniversities: ["West Virginia University", "Marshall University"],
    outOfStateDistractor: { name: "Virginia Tech", state: "VA" }
  },
  {
    id: "WI",
    name: "Wisconsin",
    capitol: "Madison",
    topCities: ["Milwaukee", "Green Bay", "Kenosha"],
    inStateUniversities: ["University of Wisconsin-Madison", "Marquette University"],
    outOfStateDistractor: { name: "University of Minnesota", state: "MN" }
  },
  {
    id: "WY",
    name: "Wyoming",
    capitol: "Cheyenne",
    topCities: ["Casper", "Laramie", "Gillette"],
    inStateUniversities: ["University of Wyoming", "Casper College"],
    outOfStateDistractor: { name: "Colorado State University", state: "CO" }
  }
];
