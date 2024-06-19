# ClanPlan - The Family Task Manager

ClanPlan is an app for planning and distributing tasks within a family.

In the app you can create a family with several family members. It is possible to create a variety of tasks in different categories and assign them to individual or multiple family members.

Created Tasks can be filtert by different criteria. The app also has a calendar view in which it is possible to get an overview of tasks that are due in the near future. Users, comments, tasks and categories can be created, deleted and changed. In the background of our app there is a MongoDB database in which user data, tasks, categories and member relationships are stored.

The ClanPlan is provided with a login, so the data of the families and members can only be seen in a password-protected area.

The app can be accessed at [www.clanplan.org](www.clanplan.org).

## Features and Techstack

- Create Member/User, Family, Categories, Tasks an Comments
- Read Member/User, Family, Categories, Tasks an Comments
- Update Member/User, Family, Categories, Tasks an Comments
- Delete Member/User, Family, Categories, Tasks an Comments

- Backend with [Mongoose](https://mongoosejs.com/) and [Atlas MongoDB](https://www.mongodb.com/)
- Save Profile Pictures in [Cloudinary](https://cloudinary.com/)
- Notification Messages with [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- LogIn with [NextAuth](https://next-auth.js.org/)
- Calendarview with [React-Big-Calendar](https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page)
- Styling with [Styled-Components](https://styled-components.com/)
- Dropdownmenues with [Multiselect-React-Dropdown](https://snyk.io/advisor/npm-package/multiselect-react-dropdown#package-footer)
- Emailnotifications for joining a Family with [Email JS](https://www.emailjs.com/)

## Authors

- [@Mariia Posselt](https://github.com/mariiaovs)
- [@Swetha Siddareddydinne Janardhana](https://github.com/SwethaJanardhana)
- [@PaulJohannFlade](https://github.com/PaulJohannFlade)

### Local Development

To work locally, please install the dependencies using `npm i` first.

Add local environment variables for MongoDB, NextAuth and Cloudinary connection string. To do so create `.env.local` file in the project's root.

`MONGODB_URI="..."
--> Register at Atlas MongoDB

GITHUB_ID=...
GITHUB_SECRET=...
--> Register NextAuth in Git Hub - Settings

NEXTAUTH_URL=...
NEXTAUTH_SECRET=...
--> Register NextAuth
GOOGLE_ID=...
GOOGLE_SECRET=...
--> Register NextAuth in Google Account

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET=...

--> Register Cloudinary`

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Use `npm run test` to run the tests.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run start` to start a production server
- `npm run test` to run the tests
- `npm run lint` to run the linter
