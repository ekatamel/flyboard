# About this project

## Overview

This app was desined to improve the way customers interact with Flyboard.cz company to get the flyboarding experience. By facilitating online sales of vouchers, merchandise, and video content, this app streamlines the process of making reservations and reduces the administrative overhead associated with managing such organization.

## What is Flyboarding?

Flyboarding is water sport that employs a type of water jetpack attached to a personal watercraft. This jetpack propels the rider through air and water, allowing for spectacular maneuvers and an unforgettable experience.

## Key features

- **Voucher Purchase**: Allows to buy vouchers, along with merchandise and videos, directly through the app.
- **Voucher Generation**: Allows to generate PDF vouchers, which are downloadble in the app and sent via email.
- **Discount Application**: Allows to take advantage of discounts, including those offered by third-party partners.
- **Payment Integration**: Offers integrated card payments through Stripe and supports QR code generation for bank transfers.
- **Reservation System**: Lessons reservations with options to select location, date, and time, accommodating multiple vouchers.
- **Emailing**: Implemented automated emailing tasks to send customers order details, vouchers and reminders. 
- **Admin Console**: interface for managing vouchers, locations, discounts, and reservations.

# Tech stack

## Backend

The backend infrastructure, crafted by [@meliksetz](https://github.com/meliksetz), combines selection of technologies:

- **Flask** as lightweight web application framework and its extensions
- **Celery with RabbitMQ/AMQP** for asynchronous task handling and message passing.

The repository with backend part is private and link is provided upon request.

## Frontend

- **React** with **Chakra UI**, **Framer Motion**, **Swiper**, **Tailwind CSS** for a responsive and animated UI.
- **Formik** and **Yup** for form management.
- **Axios**, **React Query** for data fetching and state management.
- **Stripe** for online payments in React applications. 

# Screenshots

### Intro screen:
<img width="1440" alt="Screenshot 2024-03-14 at 19 43 34" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/9dcdd179-78db-41a3-bfa4-207ed5d2180b">

### Lessons selection:
<img width="1440" alt="Screenshot 2024-03-14 at 19 43 58" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/ff009ce7-1e04-4f0a-82f7-01a6eb781956">

### Merch selection:
<img width="1439" alt="Screenshot 2024-03-14 at 19 45 13" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/beef3741-fe3e-404b-b9b0-125acaf5a79f">

### Summary screen:
<img width="1439" alt="Screenshot 2024-03-14 at 19 45 31" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/d3f69b9d-37c0-48c2-b66f-13d39dafcb6d">

### Payment screen:
<img width="1435" alt="Screenshot 2024-03-14 at 19 45 40" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/fe8a8a11-921f-4f32-b256-e925adba45a4">

### Generated PDF vouchers:
<img width="1440" alt="Screenshot 2024-03-14 at 19 49 16" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/10d91a51-147c-4ab1-b293-e17a7f951493">

### Voucher validation:
<img width="1438" alt="Screenshot 2024-03-14 at 19 51 28" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/8c08c53b-91e8-4015-a44e-6635ae3ed3c8">

### Date/time/location selection:
<img width="1439" alt="Screenshot 2024-03-14 at 19 53 49" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/faacb2f0-534f-47e9-83f0-3fb2e91af205">

### Admin panel - Vouchers:
<img width="1440" alt="Screenshot 2024-03-14 at 19 54 54" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/78a69700-0073-4d66-b0ce-7d6024468391">

### Admin panel - Reservation:
<img width="1440" alt="Screenshot 2024-03-14 at 19 55 07" src="https://github.com/ekatamel/flyboard_show.cz/assets/52611390/85428410-e19d-43a9-9435-eaccaa6c7c6d">



