// src/services/chatGPTService.js
import axios from "axios";
// https://platform.openai.com/docs/api-reference/completions/create
console.log("open API key", import.meta.env.VITE_OPENAI_API_KEY);

const chatGPTAPI = axios.create({
  baseURL: "https://api.openai.com/v1/engines/text-davinci-003/completions",
  // baseURL: "https://api.openai.com/v1/completions",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  }
});
async function fakeAsync(delay) {
  // Return a Promise that resolves after the specified delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Delayed response");
    }, delay);
  });
}

export async function queryChatGPT(prompt) {
  // await fakeAsync(2000);
  // return "faked response for prompt " + prompt;

  try {
    const response = await chatGPTAPI.post("", {
      prompt: prompt,
      max_tokens: 150,
      n: 3,
      stop: null,
      temperature: 0.5
    });

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].text.trim();
    }
    return null;
  } catch (error) {
    console.error("Error querying ChatGPT:", error);
    return null;
  }
}
