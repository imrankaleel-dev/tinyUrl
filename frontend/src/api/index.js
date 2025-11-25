import axios from "axios";

export const getAllLinks = async () => {
  try {
    const { data } = await axios.get("/api/links");

    return data.result;
  } catch (err) {
    console.error(err);
  }
};

export const deleteLink = async (shortLink) => {
  try {
    await axios.delete(`/api/links/${shortLink}`);
  } catch (err) {
    console.error(err);
  }
};

export const createNewLink = async (link) => {
  try {
    await axios.post(`/api/links`, {
      link,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getLinkStats = async (link) => {
  try {
    const { data } = await axios.get(`/api/links/${link}`);

    return data.result;
  } catch (err) {
    console.error(err);
  }
};

export const healthCheck = async () => {
  try {
    await axios.get(`/api/healthz`);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
