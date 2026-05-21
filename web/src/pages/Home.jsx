import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin, ChevronLeft, ChevronRight, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import SEO from '../components/SEO';
import './Home.css';

/* SVG de hoja clásica decorativa */
const LeafClassic = ({ className }) => (
  <svg className={className} viewBox="0 0 150.3 299.04" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" fillRule="evenodd" d="M146.46,298.95c.94.31,4.4-.16,3.77-2.83-.63-2.67-.16-13.98-4.87-20.89-4.71-6.91-9.42-16.33-9.42-20.89s-1.41-27.48-5.18-41.62c-3.77-14.13-9.74-23.87-10.36-38.94-.63-15.08,2.52-35.49-4.71-49.94-7.23-14.45-20.1-34.55-20.1-47.11s4.08-20.73-7.85-33.3c-11.93-12.56-24.5-13.19-30.15-21.67-5.65-8.48-12.56-17.27-22.61-20.42C24.92-1.78,16.75.73,12.98,6.7,9.21,12.67-1.15,15.18.1,38.11c1.26,22.93,16.65,43.34,23.87,60.62,7.22,17.27,15.7,44.91,24.81,51.51,9.11,6.6,27.95,13.19,28.89,17.75.94,4.55,1.1,10.84,4.87,13.66,3.77,2.83,3.61,2.2,6.91,8.32,3.3,6.12,8.48,20.88,13.66,23.71,5.18,2.83,6.44,6.91,10.36,13.82,3.93,6.91,11.94,22.45,15.86,29.05,3.93,6.6,7.22,10.84,10.05,18.85,2.83,8.01,6.28,12.4,7.06,23.56Z"/>
  </svg>
);

/* SVG de hoja Monstera */
const LeafMonstera = ({ className }) => (
  <svg className={className} viewBox="0 0 773.84 575.31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" fillRule="evenodd" d="M91.79,308.38s-23.25-32.61-45.24-78.28C24.57,184.44,8.48,121.69,13.4,120.96c4.92-.74,21.7-2.44,30.17-4.46,8.47-2.02,15.54-8.91,15.54-8.91,0,0-53.38-11.56-57.83-17.17-4.44-5.61,3.89-45.79,7.57-49.41,3.69-3.62,38.28-27.03,99.03-34.99,60.75-7.96,103.58-7.81,111.78-.85,8.2,6.96,51.66,63.48,55.49,57.53,3.83-5.96-15.26-48.54-15.26-48.54,0,0,34.74,6.78,82.92,31.71,48.17,24.93,69.61,39.44,72.43,45.52,2.82,6.08,19.74,42.53,20.99,49.73,1.25,7.2,4.13-38.84,4.13-38.84,0,0,70.44,53.65,108.05,87.41,37.61,33.76,49.32,71.31,74.67,129.64,25.35,58.33,2.16,131.92,2.16,131.92,0,0,19.4,18,40.35,32.71,20.96,14.71,72.58,49.33,84.86,55.46,12.28,6.13,21.75,6.18,22.29,8.79.55,2.61,2.33,24.37-.3,26.74-2.63,2.37-20.03-7.49-41.27-23.67-21.24-16.18-52.39-42.01-52.39-42.01,0,0-56.17-45.52-60.49-47.66-4.32-2.14-4.29,14.46-21.93,30.17-17.63,15.72-54.08,38.79-111.33,36.83-57.25-1.95-126.37-10.89-146.78-19.01-20.41-8.12-28.97-19.37-28.97-19.37,0,0,16.78,2.28,38.91-1.03,22.13-3.3,31.7-14.21,31.7-14.21,0,0-89.41.52-98.52-5.38-9.11-5.89-75.01-56.59-103.14-82-28.13-25.41-57.03-52.09-55.83-55.67,1.2-3.58,39.24-17.32,35.95-21.03-3.29-3.71-66.57-2.54-66.57-2.54h0ZM162.82,288.32c-10-.51,10.9,3.42,21.97,4.84,11.07,1.42,45.42-4.71,41.62-8.55s-63.59,3.71-63.59,3.71h0ZM554.64,337.08c8.48-9.99-2.09-86.46-9.39-114.73-7.29-28.28-16.75-42.44-19.2-35.94-2.45,6.51,8.51,59.38,14.25,80.82,5.74,21.44,14.34,69.85,14.34,69.85h0ZM230.18,314.51c-16.54.69,34.74,6.78,61.78,4.57,27.04-2.21,81.81-18.31,72.38-15.88-9.43,2.43-63.63,1.22-76.92.98-13.3-.24-44.68,5.65-57.24,10.33Z"/>
  </svg>
);

/* SVG de helecho (Fern Frond) */
const LeafFern = ({ className }) => (
  <svg className={className} viewBox="0 0 367.01 666.15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" fillRule="evenodd" d="M231.26,665.69c4.76,4.76,10.05-28.04,5.82-66.14-1.36-12.21-5.48-41.26-10.47-77.61,12.96-4.48,55.79-29.98,79.78-51.75,28.57-25.93,70.9-75.14,40.74-76.72-26.83-1.41-104.33,101.44-121.11,124.17-1.07-7.81-2.17-15.93-3.29-24.27,15.01-10.98,93.1-81.51,106.68-96.72,14.83-16.61,41.8-63.23,37.04-66.14-4.76-2.91-5.29.79-19.84,10.32-13.47,8.81-112.4,113.3-127.02,128.77-1.13-8.59-2.25-17.32-3.36-26.09,12.22-10.29,76.7-65.21,107.76-104.39,34.39-43.39,49.21-67.73,38.1-72.49-11.11-4.76-43.39,19.05-64.55,49.74-21.17,30.69-45.51,64.55-59.79,80.96-10.62,12.2-19.93,21.91-24,26.08-1.41-11.54-2.76-23.05-4.01-34.32,10.11-10.16,53.64-53.86,78.54-78.53,28.31-28.04,65.61-86.25,62.96-96.3-2.65-10.05-17.73-12.17-35.72,12.7-17.99,24.87-43.65,70.38-71.43,108.21-27.71,37.74-35.76,40.68-35.8,40.7-1.48-13.9-2.79-27.3-3.84-39.81,13.32-15.66,111.64-131.97,114.11-155.65,2.65-25.4-19.58-25.4-44.97,12.17-25.4,37.57-57.94,104.77-62.97,110.32-3,3.31-6,6.91-7.93,9.27-.67-10.92-1.04-20.72-1.04-29.03,0-11.69-.19-23.06-.52-33.94,8.53-9.35,37.76-41.65,57.9-66.93,23.81-29.9,60.05-88.36,47.09-94.45-12.96-6.08-35.71,11.38-54.23,48.95-18.52,37.57-21.97,41.54-33.61,61.91-7.94,13.9-14.65,22.99-18.11,27.37-.62-11.67-1.4-22.49-2.29-32.16,8.89-11.15,32.45-41.52,47.24-68.35,18.52-33.6,35.71-73.81,24.33-75.13-11.38-1.32-32.54,25.4-42.33,52.91-9.79,27.51-8.47,37.57-18.26,56.36-5.58,10.71-9.78,17.16-12.37,20.73-1.57-13.72-3.34-24.05-5.04-29.78,2.91-12.44,7.42-34.11,10.12-59.07C205.78,52.39,197.32,0,183.56,0s-14.29,26.46-14.29,60.32c0,27.67,12.16,72.57,16.6,88.07-3.21-7.08-12.39-26.98-21.36-43.63-11.11-20.64-34.66-79.63-46.83-74.34-12.17,5.29,11.65,53.44,29.11,85.98,13.8,25.72,32.89,45.83,40.29,53.12.48,14.54,1.73,33.82,3.08,52.48-5.72-9.61-19.96-33.48-44.67-74.66-33.33-55.56-62.7-90.75-72.75-76.72-10.05,14.02,14.81,54.77,27.51,70.9,11.63,14.78,80.71,97.99,92.26,111.9.92,12,1.67,21.86,1.97,27.33.2,3.59.57,9.59,1.08,17.42-6.65-7.9-23.81-28.39-39.99-48.72-20.64-25.93-76.46-99.47-94.98-110.06-18.52-10.58-29.63-10.58-21.69,15.61,7.94,26.19,76.46,97.63,107.94,125.94,31.48,28.31,50.65,45.31,50.65,45.31h0c.93,12.98,2.02,27.73,3.25,43.25-6.08-6.97-20.41-23.07-50.59-55.77-44.45-48.15-96.3-106.89-114.82-111.12-18.52-4.23-34.39,16.4,10.58,62.44,42.08,43.07,144.26,123.66,157.23,133.85.83,9.76,1.69,19.57,2.59,29.21-3.96-2.75-11.63-8.74-23.02-20.47-17.46-17.99-113.23-106.88-138.63-123.28-25.4-16.4-40.74-24.87-43.92-14.29-3.18,10.58,42.86,78.84,99.48,112.71,47.78,28.58,94.62,57.53,108.07,65.87.68,6.82,1.37,13.46,2.07,19.83-5.41-4.3-16.07-12.32-29.45-20.1-19.58-11.38-70.64-43.12-99.48-60.85-28.84-17.72-62.97-24.08-62.97-12.96s46.56,48.94,89.95,74.87c37.86,22.63,91.23,35.58,104.21,38.51.58,4.66,1.17,9.08,1.75,13.2.58,4.08,1.1,8.17,1.56,12.26-12.68-5.26-58.46-24.45-81.34-36.46-26.72-14.02-80.43-44.71-98.15-44.71s-7.67,23.81,27.78,44.71c35.45,20.9,106.79,39.84,129.9,44.45,21.94,4.38,22.8,1.98,22.84,1.73,5.44,56.33,2.7,111.68,14.88,142.57Z"/>
  </svg>
);

/* SVG de rama de eucalipto (Eucalyptus Branch) */
const LeafEucalyptus = ({ className }) => (
  <svg className={className} viewBox="0 0 871.73 656.39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" fillRule="evenodd" d="M863.83,594.28l7.9-21.27s-67.67-14.38-123.81-32.43c6.47-18.4,20.99-62.82,21.62-92.48.82-38.22-18.11-51.37-18.11-51.37,0,0-2.7,47.12-9.61,75.19-4.97,20.2-1.21,51.27,1.28,67.1-3.31-1.09-6.57-2.19-9.77-3.31-6.76-2.36-14.33-5.21-22.6-8.55-1.52-11.2-4.09-39.47,3.63-66.14,9.91-34.25,15.68-68.12,11.04-110.76-4.64-42.64-25.87-77.12-25.87-77.12,0,0,12.11,27.44,6.36,77.67-5.74,50.23-25.8,90.58-22.19,123.35,2.46,22.35,14.5,41.18,21.91,50.9-12.11-5.02-25.61-11.01-40.23-17.97-1.89-9.35-5.54-35.8,3.24-74.12,11.08-48.38,21.26-81.06,14.66-120.94-6.6-39.88-30.65-66.1-30.65-66.1,0,0,17.65,18.07,11.52,70.8-6.13,52.73-21.39,73.62-22.58,125.84-.77,33.88,9.85,52.52,17.41,61.44-16.15-7.82-33.57-16.76-51.94-26.81-2.57-10.44-7.03-36.88,4.45-64.86,14.79-36.05,27.59-79.05,22.84-117.62-4.75-38.57-29.53-70.02-29.53-70.02,0,0,12.06,37.66,6.55,79.75-5.51,42.09-24.56,75.95-23.33,110.9.91,26.06,11.78,50.25,17.25,60.88-14.56-7.99-29.7-16.66-45.26-26.01-5.12-11.27-10.78-32.06-2.76-60.6,12.54-44.58,23.84-87.82,19.12-123.31-4.72-35.5-30.65-66.1-30.65-66.1,0,0,12.69,20.37,8.83,68.34-3.86,47.97-19.68,74.15-17.16,120.55,1.49,27.45,11.09,47.19,18.68,58.75-15.22-9.21-30.83-19.06-46.69-29.54-3.01-9.91-8.94-37.76,3.29-77.51,15.46-50.26,19.77-87.94,13.59-120.59-6.18-32.65-25.59-59.18-25.59-59.18,0,0,14.91,25.83,6.25,75.1-8.66,49.27-25.17,73.29-23.14,112.98,1.53,30.04,16.22,56.55,23.26,67.66-16.78-11.14-33.82-22.98-50.95-35.51-.36-12.66.16-43.38,11.27-74.57,14.49-40.7,24.91-51.86,18.2-94.31-6.71-42.45-31.36-77.97-31.36-77.97,0,0,15.26,29.46,10.35,78.29-4.9,48.83-26.5,95.07-23.96,121.54,1.65,17.19,7.82,34.44,11.95,44.41-4.59-3.38-9.19-6.81-13.78-10.28l-21.08-15.95c-2.11-12.1-4.95-34.6-.67-50.73,6.14-23.08,24.74-37.57,23.8-84.24-.94-46.67-24.01-89.1-24.01-89.1,0,0,9.3,29.05,1.3,70.76-8,41.7-25.86,71.14-24.67,103.03.62,16.63,7.65,31.91,14.23,42.72-12.63-9.55-24.78-18.73-36.43-27.55,1.35-4.69,3.7-15.89,4.37-38.64.96-32.57,15.87-51.22,21.77-102.45,5.9-51.23-17.4-77.34-17.4-77.34,0,0,4.33,37.99-.04,62.88-4.37,24.88-21.11,47.09-31.48,84.33-7.33,26.32,3.57,50.23,10.61,61.99-10.85-8.23-21.25-16.14-31.17-23.72-.02-.18-2.56-24.32.95-50.27,3.53-26.04,15.11-44.69,27.23-89.85,12.11-45.16-2.74-51.55-2.74-51.55,0,0-2.41,22.12-9.19,39.48-6.78,17.36-25.62,33.35-33.08,71.56-7.43,38.08,16.66,80.33,16.83,80.63-12.09-9.23-23.48-17.99-34.15-26.27-3.11-12.6-7.29-36.94.02-57.41,10.39-29.06,26.86-89.14,19.71-112.23-7.15-23.09-23.68-48.41-23.68-48.41,0,0,9.01,40.76,4.52,69.72-4.49,28.96-18.97,26.71-18.07,76.95.58,32.25,8.62,56.02,14.3,68.9-8.21-6.39-15.98-12.49-23.3-18.32-.09-.24-4.63-12.65-6.18-48.33-1.57-36.03.8-61.22-.7-91.11-1.5-29.88-20.74-64.06-20.74-64.06,0,0,5.24,15.64.7,54.81-4.54,39.17-2.99,58.84-.57,89.38,2.4,30.25,27.01,58.76,27.48,59.3-10.41-8.28-19.91-16-28.48-23.16-.12-.25-11.24-23.35-12.62-50.51-1.39-27.31-4.8-64.65-8.92-90.85-4.12-26.2-4.34-31.35-10.39-45.07-6.05-13.72-11.91,4.28-10.85,46.89,1.06,42.58,15.48,115.55,42.74,139.51-10.49-8.77-19.59-16.73-27.25-23.89,0,0-16.82-34.54-20.41-50.94-3.59-16.41-7.85-54.9-17.38-82.45-9.53-27.55-37.7-50.32-37.7-50.32,0,0,10.89,15.49,17.84,49.8,6.95,34.31,12.67,56.87,24.63,85.11,11.78,27.8,32.36,48.16,33,48.79-3.28-3.07-6.3-5.99-9.04-8.77-22.37-22.64-50.32-46.75-68.12-61.64-15.28-17.65-38.95-44.64-51.5-57.12-19.49-19.38-29.85-31.72-49.72-48.61C13.18-2.88-2.57-.21.35.75c2.92.96,12.82,9.66,19.49,19.38,6.67,9.73,13.03,21.45,26.77,31.76,13.74,10.31,9.82,9.19,30.96,34.45,21.13,25.26,71.05,50.06,71.05,50.06,13.97,13.51,30.99,29.87,47.89,45.81-8.35-4.09-23.93-10.99-36.19-12.18-17.63-1.71-43.83-.92-58.09-2.88-14.27-1.96-31.75-9.53-31.75-9.53,0,0,25.9,27.53,48.71,32.09,21.84,4.36,54.39-9.05,79.89-5.1,11.01,10.37,21.9,20.5,31.79,29.48-7.08-5.12-20.06-11.5-39.76-10.16-32.04,2.19-46.9,2.44-62.58,4.61-15.67,2.17-35.8.07-35.8.07,0,0,37.92,19.17,64.54,22.28,26.61,3.1,67.99-20.92,80.14-10.89h0c9.7,8.7,18.12,15.95,24.29,20.78-14.42-5.45-32.22-9.5-46.72-4.51-29.7,10.22-48.96,18.99-64.6,24.24-15.64,5.24-35.26,3.22-35.26,3.22,0,0,45.49,19.84,73.77,15.53,28.27-4.31,52.77-22.02,68.48-26.19,7.04-1.87,13.97-1.92,19.47-1.42,5.41,4.01,11.98,9.09,19.32,14.88h0s0,0,0,0c6.86,5.41,14.38,11.45,22.26,17.81-13.54-3.42-33.59-7.11-50.37-4.56-28.28,4.31-35.16,12.44-71.47,19.08-36.31,6.64-59.49-8.71-59.49-8.71,0,0,10.16,16.91,43.53,22.6,33.37,5.69,55.93-4.62,83.1-18.3,18.27-9.2,43.7-8.53,58.4-7.11,11.88,9.61,24.43,19.85,36.61,29.77-12.83-3.61-32.06-7.79-43.14-4.39-17.72,5.43-29.44,18.44-73.52,28.99-44.07,10.55-74.12-9.96-74.12-9.96,0,0,20.94,29.83,56.04,34.25,35.1,4.42,70.65-10.52,94.26-30.88,15.48-13.35,33.68-15.17,44.37-14.84,13.1,10.66,25.65,20.83,36.3,29.28-11.83-1.58-27.3-2.14-42.78,1.67-31.89,7.83-39.89,19.89-78.28,33.36-38.39,13.48-66.14-2.08-66.14-2.08,0,0,27.47,27.26,65.03,29,37.56,1.73,69.66-17.32,89.43-39.3,11.28-12.54,27.17-16.68,38.73-17.93,6.91,5.42,12.77,9.88,17.12,12.97,6.18,4.39,16.62,11.85,30.01,21.28-13.54-3.01-30.1-4.47-44.06.9-29.35,11.29-43.2,21.42-74.41,38.05-31.21,16.63-68.49,3.18-68.49,3.18,0,0,27.48,20.62,66.7,21.59,39.22.97,61.44-17.06,84.78-39,14.03-13.19,33.47-16.37,46.75-16.82,8.67,6.06,18.23,12.7,28.42,19.68-8.05-1.77-18.63-2.32-27.07,3.45-15.85,10.83-27.26,37.31-70.87,51.51-43.61,14.2-86.65-1.68-86.65-1.68,0,0,47.05,32.86,87.12,28.34,40.07-4.52,55.7-28.44,76.04-55.18,12.19-16.03,21.86-20.88,27.64-22.19,13.53,9.23,28.04,18.98,42.97,28.78-11.58-1.78-26.55-1-44.05,6.74-42.81,18.93-55.44,47.64-86.41,56.13-30.97,8.49-61.32,12.99-43.92,16.19,0,0,62.25,10.68,97.46-11.98,35.21-22.66,39.57-34.25,57.86-46.75,11.06-7.56,25.38-9.56,34.97-9.97,7.29,4.7,14.63,9.38,21.97,13.97-8.6-1.54-17.17-1.22-21.42,4.32-10.31,13.42-16.07,33.3-47.37,53.24-31.31,19.93-113.66,19.19-113.66,19.19,0,0,71.27,15.14,98.24,12.68,26.97-2.46,68.2-14.21,85.12-49.43,8.04-16.74,13.77-24.77,17.57-28.58,16.45,10,32.58,19.36,47.66,27.46h0s1.69,16.35-20.66,38.45c-22.34,22.1-63.25,25.47-94.75,30.81-31.5,5.34-94.25-5.41-94.25-5.41,4.98,14.06,105,24.92,133.21,27.81,60.65,6.22,99.68-49,86.77-86.23,1.62.84,3.24,1.66,4.82,2.46,13.41,6.73,27.84,13.23,42.6,19.39-4.67,15.23-16.33,46.43-35.7,55.64-25.94,12.34-66.15,11.21-84.37,16.57-18.21,5.36-55.41,14.42-55.41,14.42,0,0,40.49-3.95,68.75,5.04,28.26,8.98,82.66,1.06,100.29-33.53,11.56-22.68,11.74-44.27,10.5-56.44,12.99,5.35,26.2,10.43,39.15,15.18-5.76,5.82-15.05,19.65-13.29,47.41,2.53,39.76,43.26,57.32,44.18,51.33.93-5.99-3.68-9.26-17.58-41.58-10.44-24.26-10.27-46.3-9.54-55.79,60.34,21.92,114.16,36.4,114.16,36.4h0ZM176.28,163.02s-29.66,7.96-56.57-6.44c-26.91-14.4-59.96-35.37-66.98-39.53-7.03-4.16,36.61-1.99,69.69,15.41,33.09,17.4,53.85,30.56,53.85,30.56h0ZM160.46,142.19s-26.11-36.3-44.28-64.16c-18.17-27.87-15.76-56.64-22.54-68.94-6.78-12.3,6.61-3.06,21.1,22.19,14.49,25.25,58.43,122.26,45.72,110.91Z"/>
  </svg>
);

/* SVG onda separadora */
const WaveTop = ({ fill = '#F4EBDD', bg = 'transparent', className = '' }) => (
  <div className={`wave-transition wave-transition--top ${className}`.trim()} style={{ background: bg }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

const WaveBottom = ({ fill = '#F4EBDD', bg = 'transparent', className = '' }) => (
  <div className={`wave-transition wave-transition--bottom ${className}`.trim()} style={{ background: bg }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill={fill}/>
    </svg>
  </div>
);

/* Ícono SVG lineal de planta interior */
const IconInterior = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="20" y="44" width="24" height="12" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 44 C32 44 32 30 32 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 36 C32 36 20 28 16 18 C26 18 32 26 32 36Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 30 C32 30 44 22 48 12 C38 12 32 22 32 30Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconFlor = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 8 C32 8 28 18 32 26 C36 18 32 8 32 8Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 38 C32 38 28 48 32 56 C36 48 32 38 32 38Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 32 C8 32 18 28 26 32 C18 36 8 32 8 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 32 C38 32 48 28 56 32 C48 36 38 32 38 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 14 C14 14 20 22 26 26 C22 20 14 14 14 14Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 38 C38 38 44 46 50 50 C46 44 38 38 38 38Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconRegalo = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="10" y="28" width="44" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="20" width="44" height="10" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 L32 56" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 C32 20 24 14 20 10 C24 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 20 C32 20 40 14 44 10 C40 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconJardineria = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M14 50 L28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="34" cy="18" rx="12" ry="8" transform="rotate(-30 34 18)" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 24 C28 24 36 20 42 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const IconMaceta = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M18 28 L22 54 L42 54 L46 28 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="14" y="22" width="36" height="8" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 22 C32 22 32 14 32 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 16 C32 16 24 10 20 6 C26 6 32 12 32 16Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 14 C32 14 40 8 44 4 C38 4 32 10 32 14Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconAsesoramiento = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M12 40 C12 40 12 20 32 14 C52 8 54 28 44 36 C36 42 28 38 28 38 L20 52 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="26" cy="28" r="2" fill="currentColor"/>
    <circle cx="32" cy="28" r="2" fill="currentColor"/>
    <circle cx="38" cy="28" r="2" fill="currentColor"/>
  </svg>
);

const BASE = import.meta.env.BASE_URL;
// Reemplazar por el numero final de WhatsApp en formato internacional (sin + ni espacios).
const WHATSAPP_NUMBER = 'AQUI_COLOCAR_NUMERO';
// Si queres cambiar imagenes, edita solo el campo image de cada objeto en COMBO_INSPIRATIONS.

const createWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const COMBO_CUSTOM_MESSAGE =
  'Hola De Raíz, quiero armar un combo personalizado con planta y maceta. ¿Me pueden ayudar?';

const COMBO_INSPIRATIONS = [
  {
    id: 'toque-natural',
    title: 'Combo Toque Natural',
    description: 'Un toque de naturaleza que transforma tu espacio.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/662883861_18084336809621436_14415400890110370_n.webp`,
    alt: 'Combo Toque Natural con planta ornamental y maceta blanca texturada.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Toque Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-mini',
    title: 'Combo Selva Mini',
    description: 'Sumá verde y frescura a tus espacios.',
    includes: 'Monstera adansonii + maceta a elección',
    image: `${BASE}images/Combos/681808372_18084336797621436_6574950320876914164_n.webp`,
    alt: 'Combo Selva Mini con Monstera adansonii y maceta de interior.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Mini en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'rincon-calido',
    title: 'Combo Rincón Cálido',
    description: 'Sumá calidez y vida a tus espacios.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682819319_18084336818621436_4685393247746492369_n.webp`,
    alt: 'Combo Rincón Cálido con planta variegada en maceta tejida.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Rincón Cálido en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-natural',
    title: 'Combo Selva Natural',
    description: 'Verde que transforma, vida que inspira.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682935109_18084336827621436_33320198583019895_n.webp`,
    alt: 'Combo Selva Natural con planta Monstera en maceta de cerámica clara.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
];

const ADVICE_STEPS = [
  { title: 'Tu espacio', detail: 'Nos contas dónde va la planta.' },
  { title: 'Nuestras sugerencias', detail: 'Te proponemos 3 opciones claras.' },
  { title: 'Tu elección', detail: 'Confirmás por WhatsApp si querés.' },
];

const ADVICE_FEATURED_IMAGE = `${BASE}images/Plantas/Boca de sapo.png`;

const CATEGORIES = [
  { 
    icon: <IconInterior />, 
    title: 'Plantas', 
    shortDesc: 'Interior, exterior y suculentas.', 
    link: '/catalogo', 
    color: '#2F4A2E',
    bgImage: `${BASE}images/categorias/bg_plantas.png`,
    adviceTitle: 'Tip Botánico',
    advice: 'Cada planta tiene su lugar. Las de interior suelen preferir luz indirecta brillante, mientras que las de exterior y huerta necesitan mucho sol directo. Es clave elegir la planta según la luz real de tu espacio, no al revés.'
  },
  { 
    icon: <IconMaceta />, 
    title: 'Macetas', 
    shortDesc: 'Barro, plástico y decorativas.', 
    link: '/catalogo?cat=Macetas', 
    color: '#A65F3A',
    bgImage: `${BASE}images/categorias/bg_macetas.png`,
    adviceTitle: 'El Secreto del Drenaje',
    advice: 'El drenaje es vital para que las raíces no se pudran. Usá macetas con agujeros siempre que puedas. Si elegís una maceta decorativa sin drenaje, te recomendamos usarla como portamaceta.'
  },
  { 
    icon: <IconJardineria />, 
    title: 'Insumos', 
    shortDesc: 'Sustratos y fertilizantes.', 
    link: '/catalogo?cat=Sustratos%20y%20Tierra', 
    color: '#6F7F5F',
    bgImage: `${BASE}images/categorias/bg_insumos.png`,
    adviceTitle: 'Nutrición y Tierra',
    advice: 'La tierra común se compacta. Un buen sustrato debe ser suelto para que las raíces respiren y absorban nutrientes. Recordá fertilizar solo en su época de crecimiento (primavera y verano).'
  },
];

const Home = () => {
  const valueGridRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeComboIndex, setActiveComboIndex] = useState(null);

  const testimonials = [
    { name: 'Mariana R.', loc: 'Las Piedras', text: 'Me recomendaron una planta para poca luz y quedó perfecta. Muy buena atención.' },
    { name: 'Andrés P.', loc: 'Canelones', text: 'Fui por un regalo y me armaron una opción linda y rápida. Recomiendo.' },
  ];
  useEffect(() => {
    const cards = valueGridRef.current?.querySelectorAll('.value-item');
    if (!cards || cards.length === 0) return undefined;

    let rafId = null;

    const animateOnScroll = () => {
      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = (center - viewportHeight * 0.55) / viewportHeight;
        const shift = Math.max(-16, Math.min(16, distance * (14 + index * 2)));
        const rotate = Math.max(-1.2, Math.min(1.2, distance * (1.4 + index * 0.15)));
        card.style.setProperty('--scroll-shift', `${shift}px`);
        card.style.setProperty('--scroll-rotate', `${rotate}deg`);
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        animateOnScroll();
        rafId = null;
      });
    };

    animateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const openComboLightbox = (index) => {
    setActiveComboIndex(index);
  };

  const closeComboLightbox = () => {
    setActiveComboIndex(null);
  };

  const goToPrevCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev - 1 + COMBO_INSPIRATIONS.length) % COMBO_INSPIRATIONS.length));
  };

  const goToNextCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev + 1) % COMBO_INSPIRATIONS.length));
  };

  useEffect(() => {
    if (activeComboIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeComboLightbox();
      if (event.key === 'ArrowLeft') goToPrevCombo();
      if (event.key === 'ArrowRight') goToNextCombo();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeComboIndex]);

  return (
    <div className="home-page">
      <SEO
        title="De Raíz Floricultura | Venta de Plantas y Macetas en Las Piedras"
        description="Tu vivero de confianza en Las Piedras, Canelones. Encontrá la mejor selección de plantas de interior y exterior, tierra, sustratos y asesoramiento botánico personalizado en Ruta 48."
        path="/"
      />

      {/* ══════════════════════════
          HERO SPLIT ORGÁNICO
      ══════════════════════════ */}
      <section className="hero split-hero hero-sage-botanicals">
        {/* Canvas de Botánica Flotante (3D Parallax & Swaying) */}
        <div className="hero-botanical-canvas" aria-hidden="true">
          <LeafMonstera className="botanical-leaf leaf-top-left leaf-depth-foreground" />
          <LeafClassic className="botanical-leaf leaf-top-right leaf-depth-midground" />
          <LeafFern className="botanical-leaf leaf-mid-left leaf-depth-background" />
          <LeafEucalyptus className="botanical-leaf leaf-mid-right leaf-depth-midground" />
          <LeafMonstera className="botanical-leaf leaf-bottom-left leaf-depth-midground" />
          <LeafClassic className="botanical-leaf leaf-bottom-right leaf-depth-foreground" />
        </div>

        {/* Contenido principal centrado */}
        <div className="hero-content-centered animate-fade-in">
          <h1 className="sr-only">De Raiz Floricultura - Vivero en Las Piedras, Uruguay</h1>
          <span className="hero-eyebrow">
            <MapPin size={14} /> Las Piedras, Uruguay
          </span>
          <img
            src={`${BASE}images/logo-hero-white.png`}
            alt="De Raíz Floricultura"
            className="hero-brand-logo"
            loading="eager"
          />
          <p className="hero-subtitle">
            Plantas, flores y asesoramiento en Las Piedras.<br/>
            Te ayudamos a encontrar la planta perfecta para tu espacio.
          </p>
          <div className="hero-actions stagger-3">
            <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-light">
              <MessageCircle size={16} /> Asesorate gratis
            </a>
            <Link to="/catalogo" className="btn btn-outline-light">
              Ver catálogo <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Separador inferior con hoja integrada que cruza el borde */}
        <div className="hero-bottom-separator-container">
          <svg
            className="hero-bottom-separator"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,72 C180,48 340,38 520,52 C742,70 940,102 1142,88 C1258,80 1358,62 1440,46 L1440,120 L0,120 Z"
              fill="var(--crema)"
            />
          </svg>
          <LeafClassic className="separator-fallen-leaf" />
        </div>

        {/* Indicador de scroll botánico */}
        <div className="hero-scroll-indicator">
          <LeafClassic className="scroll-leaf-bounce" />
          <span className="scroll-text">Desliza para explorar</span>
        </div>
      </section>


      {/* ══════════════════════════
          ATAJOS RÁPIDOS
      ══════════════════════════ */}
      <div className="proposal-block" style={{background: 'var(--crema)'}}>
        <span className="proposal-corner proposal-corner--top-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--top-right" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-right" aria-hidden="true"></span>
        <section className="quick-actions-section section-padding--sm">
          <div className="container">
            <div className="text-center mb-12 quick-actions-header">
              <span className="section-label">Comenzá por acá</span>
              <h2>Explorá el universo De Raíz</h2>
              <p className="quick-actions-subtitle">
                Te guiamos en cada paso para que lleves la naturaleza a tu vida, con la calidad y calidez de siempre.
              </p>
            </div>
            <div className="quick-actions-grid">
              <Link to="/catalogo" className="quick-action-card quick-action-card--catalog">
                <div className="quick-action-icon-wrapper">
                  <Leaf size={26} />
                </div>
                <span className="quick-action-kicker">Catálogo Completo</span>
                <h3>Plantas & Macetas</h3>
                <p>Llevá frescura a tu hogar. Gran variedad de interior, exterior, combos exclusivos e insumos premium.</p>
                <span className="quick-action-link">Explorar catálogo <ArrowRight size={16} /></span>
              </Link>

              <Link to="/aprende-de-raiz" className="quick-action-card quick-action-card--learn">
                <div className="quick-action-icon-wrapper">
                  <BookOpen size={26} />
                </div>
                <span className="quick-action-kicker">Guías de Cultivo</span>
                <h3>Aprendé de Raíz</h3>
                <p>Convertite en experto. Consejos paso a paso sobre riego, sustratos y plagas adaptadas a Uruguay.</p>
                <span className="quick-action-link">Ir a la guía botánica <ArrowRight size={16} /></span>
              </Link>

              <Link to="/contacto" className="quick-action-card quick-action-card--contact">
                <div className="quick-action-icon-wrapper">
                  <MapPin size={26} />
                </div>
                <span className="quick-action-kicker">Atención Cercana</span>
                <h3>Visitanos o Escribinos</h3>
                <p>Encontranos en Las Piedras, Ruta 48. O chateá con nuestro equipo para recibir asesoramiento personalizado.</p>
                <span className="quick-action-link">Ver contacto y local <ArrowRight size={16} /></span>
              </Link>
            </div>
          </div>
        </section>
        {/* ══════════════════════════
            PROPUESTA DE VALOR
        ══════════════════════════ */}
        <section className="value-section section-padding--sm">
          <div className="container container--narrow text-center">
            <span className="section-label">Nuestra propuesta</span>
            <h2>No solo vendemos plantas.</h2>
            <p className="value-text">
              Plantas, flores, macetas e insumos con atencion local en Las Piedras.
            </p>
            <div className="value-grid" ref={valueGridRef}>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🌿</div>
                </div>
                <h4>Asesoramiento personalizado</h4>
                <p>Te orientamos según tu espacio, luz y experiencia.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🪴</div>
                </div>
                <h4>Plantas, flores y macetas</h4>
                <p>Gran variedad de interior, exterior, flores y más.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">📍</div>
                </div>
                <h4>Atención local</h4>
                <p>Estamos en Las Piedras, Canelones. Visitanos.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --------------------------
          COMBOS INSPIRACION
      -------------------------- */}
      <section className="combos-section section-padding--sm" aria-labelledby="combos-title">
        <div className="container">
          <div className="text-center combos-header">
            <span className="section-label">Inspiracion real</span>
            <h2 id="combos-title">Combos verdes para regalar o decorar</h2>
            <p className="combos-subtitle">
              Inspirate con algunos combos que ya armamos y escribinos para crear uno a tu medida.
            </p>
          </div>

          <div className="combos-grid">
            {COMBO_INSPIRATIONS.map((combo, index) => (
              <article
                key={combo.id}
                className="combo-card"
                role="button"
                tabIndex={0}
                onClick={() => openComboLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openComboLightbox(index);
                  }
                }}
                aria-label={`${combo.title}: ver imagen en grande`}
              >
                <div className="combo-card-image-wrap">
                  <img
                    src={combo.image}
                    alt={combo.alt}
                    className="combo-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="combo-card-content">
                  <h3>{combo.title}</h3>
                  <p className="combo-card-description">{combo.description}</p>
                  <p className="combo-card-includes">
                    <strong>Incluye:</strong> {combo.includes}
                  </p>
                  <a
                    href={createWhatsAppLink(combo.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary combo-card-btn"
                    aria-label={`${combo.title}: Quiero uno parecido por WhatsApp`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Quiero uno parecido
                  </a>
                </div>
              </article>
            ))}
          </div>

          <article className="combo-custom-cta">
            <h3>Queres armar tu propio combo?</h3>
            <p>
              Elegi una planta, una maceta y el estilo que mas te guste. Nosotros te ayudamos a
              combinarlo.
            </p>
            <a
              href={createWhatsAppLink(COMBO_CUSTOM_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary combo-custom-cta-btn"
            >
              Armar mi combo por WhatsApp
            </a>
          </article>
        </div>
      </section>

      {/* ══════════════════════════
          ASESORAMIENTO GRATUITO
      ══════════════════════════ */}
      <WaveTop fill="var(--verde-profundo)" bg="var(--crema)" />
      <section className="advice-section section-padding--sm">
        <div className="container advice-grid">
          <div className="advice-text">
            <span className="section-label advice-label">Asesoramiento gratuito</span>
            <h2>¿No sabés qué planta elegir?</h2>
            <p>
              Te guiamos en 1 minuto y te mostramos opciones reales para vos.
            </p>

            <div className="advice-steps" aria-label="Cómo te ayudamos a elegir">
              {ADVICE_STEPS.map((step, index) => (
                <div key={step.title} className="advice-step-item">
                  <span className="advice-step-number">{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="advice-actions">
              <a
                href={generateWaLink(WA_MESSAGES.ayudaElegir)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light"
              >
                <Sparkles size={18} /> Quiero mi recomendación
              </a>
              <Link to="/catalogo" className="advice-secondary-link">
                <MessageCircle size={16} /> Ver catálogo primero
              </Link>
            </div>
          </div>

          <div className="advice-image">
            <img
              src={ADVICE_FEATURED_IMAGE}
              alt="Planta destacada para asesoramiento personalizado"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      <WaveBottom fill="var(--verde-profundo)" bg="var(--beige-claro)" className="wave-transition--advice-to-categories" />

      {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)', position: 'relative', overflow: 'hidden'}}>
        {/* Hojas decorativas sutiles desenfocadas en los bordes */}
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="accordion-container">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`accordion-item ${activeAccordion === i ? 'accordion-item--active' : ''}`}
                onClick={() => setActiveAccordion(i)}
                style={{
                  '--cat-color': cat.color,
                  backgroundImage: `url(${cat.bgImage})`,
                  animationDelay: `${i * 0.08}s`
                }}
              >
                <div className="accordion-overlay"></div>
                <div className="accordion-content-wrapper">
                  <div className="accordion-icon-wrap" style={{ color: cat.color }}>
                    <div className="accordion-icon">{cat.icon}</div>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-header">
                      <h4>{cat.title}</h4>
                      <p className="accordion-short-desc">{cat.shortDesc}</p>
                    </div>
                    <div className="accordion-details">
                      <div className="advice-box" style={{ borderColor: `${cat.color}60`, backgroundColor: `rgba(255, 255, 255, 0.65)` }}>
                        <span className="advice-title" style={{ color: cat.color }}><Sparkles size={14} /> {cat.adviceTitle}</span>
                        <p>{cat.advice}</p>
                      </div>
                      <Link to={cat.link} className="btn-accordion" style={{ backgroundColor: cat.color }}>
                        Ver {cat.title} <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <WaveBottom fill="var(--beige-claro)" bg="var(--verde-profundo)" className="wave-transition--categories-to-testimonials" />


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <section className="testimonials-section section-padding">
        {/* Hojas de eucalipto decorativas desenfocadas */}
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 testimonials-header">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p className="testimonials-subtitle">
              Opiniones reales de clientes de Las Piedras.
            </p>
          </div>
          <div className="testimonial-carousel">
            <button type="button" className="testimonial-nav testimonial-nav--prev" onClick={goToPrevTestimonial} aria-label="Testimonio anterior">
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card animate-fade-in">
                    <div className="testimonial-stars">{'★★★★★'}</div>
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-author">
                      <strong>{t.name}</strong>
                      <span>{t.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="testimonial-nav testimonial-nav--next" onClick={goToNextTestimonial} aria-label="Siguiente testimonio">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="testimonial-dots" aria-label="Indicadores de testimonio">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonial-dot ${activeTestimonial === i ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-outline-light">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {activeComboIndex !== null && (
        <div
          className="combo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${COMBO_INSPIRATIONS[activeComboIndex].title}`}
          onClick={closeComboLightbox}
        >
          <div className="combo-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="combo-lightbox-close"
              onClick={closeComboLightbox}
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--prev"
              onClick={goToPrevCombo}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <figure className="combo-lightbox-figure">
              <img
                src={COMBO_INSPIRATIONS[activeComboIndex].image}
                alt={COMBO_INSPIRATIONS[activeComboIndex].alt}
                className="combo-lightbox-image"
              />
              <figcaption>
                {COMBO_INSPIRATIONS[activeComboIndex].title}
              </figcaption>
            </figure>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--next"
              onClick={goToNextCombo}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;




