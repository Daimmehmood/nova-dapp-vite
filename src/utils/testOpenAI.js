// src/utils/testOpenAI.js

import OPENAI_CONFIG from '../config/openaiConfig';

/**
 * Comprehensive test for OpenAI API integration
 * This tests both standard and project-style API keys
 */
function testOpenAI() {
  console.log("🔍 Testing OpenAI API Integration...");
  
  // Step 1: Check the API key configuration
  const apiKey = OPENAI_CONFIG.apiKey || 
                 window.VITE_OPENAI_API_KEY || 
                 localStorage.getItem('OPENAI_API_KEY');
  
  console.log("API Key available:", apiKey ? "✓ YES" : "✗ NO");
  console.log("API Key format check:", apiKey?.startsWith('sk-') ? "✓ VALID" : "✗ INVALID");
  console.log("API Key type:", apiKey?.startsWith('sk-proj-') ? "Project Key" : "Standard Key");
  
  if (!apiKey || !apiKey.startsWith('sk-')) {
    console.error("❌ OpenAI API key is missing or invalid. Test cannot proceed.");
    return "Failed: Invalid or missing API key";
  }
  
  // Step 2: Test basic OpenAI API functionality
  console.log("Making basic API call to OpenAI...");
  
  // Get the appropriate headers based on key type
  const headers = OPENAI_CONFIG.getHeaders();
  console.log("Using headers:", headers);
  
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant focused on cryptocurrency." },
        { role: "user", content: "Provide a one-sentence analysis of Bitcoin." }
      ],
      max_tokens: 50,
      temperature: 0.3
    })
  })
  .then(response => {
    console.log("Status:", response.status, response.statusText);
    console.log("OpenAI API HTTP Status:", response.status === 200 ? "✅ SUCCESS" : "❌ ERROR");
    
    if (!response.ok) {
      response.text().then(text => {
        try {
          const jsonError = JSON.parse(text);
          console.error("Error details:", jsonError);
          
          // Check for specific error types
          if (jsonError.error?.type === "invalid_request_error") {
            console.error("Invalid request error. This often means the API key is incorrect or unauthorized.");
            
            if (jsonError.error?.message?.includes("project")) {
              console.log("This appears to be an issue with a project-style API key. You may need additional configuration.");
            }
          } else if (jsonError.error?.type === "insufficient_quota") {
            console.error("Your account has insufficient quota. This means you've either exceeded your current quota or your free trial has expired.");
          }
        } catch (e) {
          console.error("Raw error text:", text);
        }
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  })
  .then(data => {
    console.log("✅ OpenAI API Response:", data);
    console.log("Response content:", data.choices[0]?.message?.content);
    console.log("API call successful! Your OpenAI integration appears to be working correctly.");
    
    // Step 3: Test the advanced config method
    console.log("\nTesting the OpenAI configuration helper...");
    testOpenAIConfig();
  })
  .catch(error => {
    console.error("❌ Test failed:", error);
    
    // Try to test the config method anyway
    console.log("\nAttempting to test the OpenAI configuration helper despite the error...");
    testOpenAIConfig();
    
    return "Test failed with error: " + error.message;
  });
  
  return "OpenAI API test initiated - check console for results";
}

/**
 * Test the OPENAI_CONFIG helper method
 */
function testOpenAIConfig() {
  console.log("Testing OPENAI_CONFIG.createChatCompletion method...");
  
  OPENAI_CONFIG.createChatCompletion([
    { role: "system", content: "You are a helpful assistant specialized in crypto." },
    { role: "user", content: "What is Ethereum?" }
  ], {
    temperature: 0.5,
    maxTokens: 100
  })
  .then(result => {
    console.log("✅ OpenAI Config test successful!");
    console.log("Response:", result.choices[0]?.message?.content);
  })
  .catch(error => {
    console.error("❌ OpenAI Config test failed:", error);
    console.log("You may need to adjust your OPENAI_CONFIG settings for project-style API keys.");
  });
}

// Make function available in global scope
window.testOpenAI = testOpenAI;
window.OPENAI_CONFIG = OPENAI_CONFIG;

// Export the test function
export default testOpenAI;