import { NextResponse } from "next/server";
import OpenAI from "openai";

// ❌ 不需要引入 HttpsProxyAgent 了
// ❌ 不需要查端口了

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
  // 👇 把原来的 chatanywhere 换成下面这个：
  baseURL: "https://api.openai-proxy.com/v1", 
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, tone } = body;

    console.log("收到请求:", product); 

    const prompt = `
      You are an expert Etsy SEO specialist.
      Product: "${product}"
      Tone: "${tone}"
      
      Please generate the following in JSON format (raw JSON only):
      {
        "title": "An SEO optimized title (max 140 chars)",
        "description": "A compelling product description (approx 100 words)",
        "tags": "13 comma-separated SEO tags"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // 处理返回结果
    let content = completion.choices[0].message.content || "{}";
    // 清理可能存在的 markdown 符号
    content = content.replace(/```json/g, "").replace(/```/g, "");
    
    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error("生成出错:", error);
    return NextResponse.json(
      { error: error.message || "生成失败，请检查网络或余额" },
      { status: 500 }
    );
  }
}