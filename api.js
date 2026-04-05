import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ── Auto-attach JWT token to every request ───────────────────
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ─────────────────────────────────────────────────────
export const login = (data) => API.post("/auth/login", data);

// ── Classrooms ───────────────────────────────────────────────
export const getClassrooms   = ()     => API.get("/classrooms");
export const addClassroom    = (data) => API.post("/classrooms", data);
export const deleteClassroom = (id)   => API.delete(`/classrooms/${id}`);

// ── Faculty ──────────────────────────────────────────────────
export const getFaculty   = ()     => API.get("/faculty");
export const addFaculty   = (data) => API.post("/faculty", data);
export const deleteFaculty = (id)  => API.delete(`/faculty/${id}`);

// ── Courses ──────────────────────────────────────────────────
export const getCourses   = ()     => API.get("/courses");
export const addCourse    = (data) => API.post("/courses", data);
export const deleteCourse = (id)   => API.delete(`/courses/${id}`);

// ── Schedule ─────────────────────────────────────────────────
export const getSchedule   = ()     => API.get("/schedule");
export const addSchedule   = (data) => API.post("/schedule", data);
export const deleteSchedule = (id)  => API.delete(`/schedule/${id}`);
