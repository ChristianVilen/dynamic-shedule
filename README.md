# Implementation NOTE: project is WIP!

## Frontend
To get project frontend running

- `npm i && npm run dev`
- project running at localhost:8000

The app now displays a schedule of the current month with the program tasks in the right places. Incomplete tasks are
moved to the current day forward in the order of oldest -> newest. Program.json has some of my extra input to
demonstrate the moving the incomplete tasks better.

- Uses Vite to run project
- Uses TypeScript
- Luxon library to handle the dates
- css modules for scoped css

Input contains three weeks. Each week contains multiple activities. Each activity has three fields: `weekday` indicates
the day of week for the activity, `title` is a short description of the daily activity and `completed` indicates whether
the user has done the activity.

Program is visualised on a calendar. The calendar is always displaying current ongoing month and displays
today as active with a different background color.

The treatment program starts on the first full week of the month and continues for three weeks. The activity of the day
is displayed under the day number. The day number will have different color depending on whether it has an activity or
not.

If a user has not completed an activity in the past, the activity will be moved to the current day. There can be only
one activity per day. Thus if there are multiple incomplete activities in the past, the first incomplete activity will
be displayed today, the second tomorrow, and so forth. For the previous days only completed activities will be
displayed.

### todo:
- more connections to backend
  - Create tasks
  - Create weeks
- Have all years weeks and show current months weeks
- Be able to go to previous months

## Backend
In backend directory
- Create .env file `cp .env.example .env`
- Fill in env vars
- API: `npm i && npm run dev`
- DB: `docker-compose up`
- Migration `npx prisma migrate dev --name <insert name>`

