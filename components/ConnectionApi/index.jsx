import { useEffect } from "react";
import { api } from "../services/api";

useEffect(() => {
  async function loadTest() {
    try {
      const response = await api.get("/task");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  loadTest();
}, []);