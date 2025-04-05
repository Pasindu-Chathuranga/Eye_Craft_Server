// services/pdfService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateOrderPDF = (orderData, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        doc.fontSize(20).text('🧾 Order Invoice', { align: 'center' });
        doc.moveDown();

        doc.fontSize(14).text(`Order ID: ${orderData._id}`);
        doc.text(`Date: ${new Date(orderData.createdAt).toLocaleDateString()}`);
        doc.moveDown();

        doc.fontSize(16).text('🧍 Customer Details');
        doc.fontSize(12).text(`Name: ${orderData.customer.name}`);
        doc.text(`Email: ${orderData.customer.email}`);
        doc.text(`Contact: ${orderData.customer.contact}`);
        doc.text(`Address: ${orderData.customer.address}`);
        doc.moveDown();

        doc.fontSize(16).text('🎨 Order Details');
        doc.fontSize(12).text(`Eye Count: ${orderData.order.Eye_Count}`);
        doc.text(`Print Style: ${orderData.order.Print_Style}`);
        doc.text(`Size: ${orderData.order.Sizes}`);
        doc.text(`Effects: ${orderData.order.Effects}`);
        doc.text(`Frame: ${orderData.order.Frames}`);
        doc.text(`Price: Rs. ${orderData.price}`);
        doc.moveDown();

        doc.fontSize(12).text('Thank you for your order!', { align: 'center' });

        doc.end();

        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', (err) => reject(err));
    });
};

module.exports = { generateOrderPDF };
