import api from "../lib/api"; // adjust path

// 🔹 fallback (used if API fails or during dev)
const fallbackNotices = [
  {
    id: 1,
    title: "Admissions Open for Session 2026–27",
    date: "2026-01-20",
    type: "Notice",
  },
  {
    id: 2,
    title: "Annual Examination Schedule Released",
    date: "2026-01-15",
    type: "Notice",
  },
  {
    id: 3,
    title: "Republic Day Celebration",
    date: "2026-01-26",
    type: "Event",
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    date: "2026-02-05",
    type: "Event",
  },
];

// 🔹 main function
const getNotices = async () => {
  try {
    const res = await api.get("/home/notices");

    // if backend returns empty, fallback
    if (!res.data?.notices?.length) {
      return fallbackNotices;
    }

    return res.data.notices;
  } catch (err) {
    console.error("Failed to fetch notices:", err);

    // fallback on error
    return fallbackNotices;
  }
};

export default getNotices;

