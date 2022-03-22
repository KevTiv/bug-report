# Bug Tracker

![website screenshot](https://github.com/KevTiv/bug-tracker/blob/main/img_src/img1.svg)
![website screenshot](https://github.com/KevTiv/bug-tracker/blob/main/img_src/img2.svg)
![website screenshot](https://github.com/KevTiv/bug-tracker/blob/main/img_src/img3.svg)
![website screenshot](https://github.com/KevTiv/bug-tracker/blob/main/img_src/img4.svg)
![website screenshot](https://github.com/KevTiv/bug-tracker/blob/main/img_src/img5.svg)

# Description
The is web application project was created to produce an easy online solution for a team to track bugs in their codebase. The project has reached its MVP (minimum viable product) goal of producing a product that can store bug information, such as name, description, resolved status, priority status, date of creation, and if available a screenshot image in a PostgreSQL database. The project was built using Typescript. The front end was built using NextJS, Sass, and TailwindCSS. The back end was built with PrismaJS as the ORM (Object-relational mapping) tool used to communicate with a PostgreSQL database hosted on the Supabase platform. For this application, I took advantage of the NextJS getServerSideProps and API functionality to build the bridge between the client-side and the backend database.

# Goal
- Create a product that can store bugs information for a team
- MVP:
    - Keep track of a bug (bug name, description, resolved status, priority author, images), update or delete bugs if necessary (update and delete action         are only allowed to user privileged).
    - Store and assign new user info and privilege when new successful sign-in has been done through Supabase GitHub Auth.
 
 # Challenges
- Find an ORM tool that will minimize SQL error and abstract the different queries inside the codebase. The ORM has to work with typescript preferably.
- Implement an authentification schema that is secure and reliable.
- Create details forms and correctly pass along the data from said forms.
- Find an effective solution for storing images.
- Change the software theme (light/dark mode) according to the user computer theme.
- Create an application with technologies not used before like typescript, Supabase, and PrismaJS.

# Solution Implemented
- Through my research for an ORM that works with typescript, I found PrismaJS. PrismaJS works especially well due to its fairly minimal initial setup, and the process of setting up the different database tables is especially easy due to its JSON-like formatting for the creation of the various table required for the database.
- For the login and authentification process of the software, I opted to go with a proven authentification solution such as GitHub Auth through the Supabase platform. I chose this solution because Supabase also offered database and file hosting as well which simplified the process of setting up the back end of the bug tracker software
- The forms implementation was especially tricky, I first tried to use react hook state to manage the content of the forms and pass them along to the database but it didn’t behave as expected. After researching for ways to make my forms work, I opted to use the react-hook-form library which fixed my issues of inconsistent data input with my forms.
- The image file storage is done through the Supabase platform.
