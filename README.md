# Implementation

To get project running

- `npm i && npm run dev`
- project running at localhost:8000

The app now displays a schedule of the current month with the program tasks in the right places. Incomplete tasks are
moved to the current day forward in the order of oldest -> newest. Program.json has some of my extra input to
demonstrate the moving the incomplete tasks better.

Notes:git rebase --interactive --root

- Uses Vite to run project
- Uses TypeScript
- Luxon library to handle the dates
- Tried out css modules for scoped css

## Input Format

```json
{
  "week<number>": [
    {
      "weekday": "MONDAY"
      |
      |
      "TUESDAY"
      |
      |
      "WEDNESDAY"
      |
      |
      "THURSDAY"
      |
      |
      "FRIDAY"
      |
      |
      "SATURDAY"
      |
      |
      "SUNDAY",
      "title": "Title for the daily activity",
      "completed": true
      |
      |
      false
    },
    ...
  ]
}
```

Input contains three weeks. Each week contains multiple activities. Each activity has three fields: `weekday` indicates
the day of week for the activity, `title` is a short description of the daily activity and `completed` indicates whether
the user has done the activity.

Treatment program is visualised on a calendar. The calendar is always displaying current ongoing month and displays
today as active with a different background color (14th in the picture above).

The treatment program starts on the first full week of the month and continues for three weeks. The activity of the day
is displayed under the day number. The day number will have different color depending on whether it has an activity or
not.

If a user has not completed an activity in the past, the activity will be moved to the current day. There can be only
one activity per day. Thus if there are multiple incomplete activities in the past, the first incomplete activity will
be displayed today, the second tomorrow, and so forth. For the previous days only completed activities will be
displayed.

Your app should match the design in the picture above using the following specs:

### Colors

- Black: `rgba(0, 0, 0, 0.8)`
- Green: `rgb(93, 175, 116)`
- White: `rgb(255, 255, 255)`

### Text Styles

- `h1` [Fjalla One 700](https://fonts.google.com/?query=Fjalla+One) `48px / 1.3`
- `h2` [Libre Franklin 700](https://fonts.google.com/?query=Libre+Franklin) `64px`
- `h3` [Libre Franklin 400](https://fonts.google.com/?query=Libre+Franklin) `10px / 1.2`
- `th` [Work Sans 700](https://fonts.google.com/?query=Work+Sans) `16px`
