import { generatePayslipHTML } from "./payslipTemplate.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

import { generateOfferHTML } from "./offerTemplate.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(process.cwd(), "logo.png");

const logoBase64 = fs.existsSync(logoPath)
  ? fs.readFileSync(logoPath, { encoding: "base64" })
  : null;

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const uploadDir = path.join(process.cwd(), "uploads");

//---------------- DRAW KEY/VALUE HELPER ----------------
const drawRow = (doc, y, label, value) => {
  doc.font("Helvetica-Bold").text(label, 60, y);
  doc.font("Helvetica").text(value, 250, y);
};

// ------------------- PAYSLIP GENERATOR -------------------
export const generatePayslip = async (data) => {
  try {
    const payslipDir = path.join(uploadDir, "payslips");
    ensureDir(payslipDir);

    const fileName = `Payslip-${Date.now()}.pdf`;
    const filePath = path.join(payslipDir, fileName);

    const html = generatePayslipHTML({
      ...data,
      logoBase64
    });

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process"
      ],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true
    });

    await browser.close();

    return `/uploads/payslips/${fileName}`;
  } catch (error) {
    console.error("Payslip error:", error);
    return null;
  }
};

// ------------------- OFFER LETTER GENERATOR -------------------
export const generateOfferLetter = async (data) => {
  try {
    const offerDir = path.join(uploadDir, "offerLetters");
    ensureDir(offerDir);

    const safeName = (data.employeeName || "Employee")
      .replace(/\s+/g, "_")        // spaces → _
      .replace(/[^a-zA-Z0-9_]/g, ""); // remove special chars

    const fileName = `Offer_Letter-${safeName}.pdf`;
    const filePath = path.join(offerDir, fileName);

    const html = generateOfferHTML({
      ...data,
      logoBase64
    });

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process"
      ],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,

      /* 🔥 FINAL PERFECT MARGINS */
      margin: {
        top: "40px",     // space for logo + header
        bottom: "90px",   // bottom breathing space
        left: "70px",
        right: "70px"
      }
    });

    await browser.close();

    return `/uploads/offerLetters/${fileName}`;

  } catch (error) {
    console.error("HTML PDF generation error:", error);
    return null;
  }
};

export default { generatePayslip, generateOfferLetter };