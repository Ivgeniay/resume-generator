import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";

@Injectable()
export class PdfService {
	async generatePdfFromHtml(html: string): Promise<Uint8Array> {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-accelerated-2d-canvas",
				"--no-first-run",
				"--no-zygote",
				"--single-process",
				"--disable-gpu",
			],
		});

		try {
			const page = await browser.newPage();

			await page.setViewport({
				width: 794,
				height: 1123,
				deviceScaleFactor: 2,
			});

			await page.setContent(html, {
				waitUntil: "networkidle0",
			});

			const pdfBuffer = await page.pdf({
				format: "A4",
				margin: {
					top: "20mm",
					right: "20mm",
					bottom: "20mm",
					left: "20mm",
				},
				printBackground: true,
				preferCSSPageSize: true,
			});

			return pdfBuffer as Uint8Array;
		} finally {
			await browser.close();
		}
	}
}
