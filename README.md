
# Fern
Full Stack Website with PERN
PostgreSQL, Express, React, NodeJS

### Goal

The goal of this site is to provide a hub for language learners to edit and find language partners.

### Features

The program is developed using PostgreSQL, Express, React, and NodeJS. Due to the relations between users, posts, etc, PostgreSQL was used over MongoDB due to its relational database in contrast to noSQL. React was used over Angular due to its more flexible and lightweight architecture.

Application Features:
 - Authentication
 - Protected routes
 - User Info and Support
 - User information
 - Posts
 - Comments
 - Selection-based edits
 - Optimized loading
 - Following system
 - Like system
 - Reporting

Major libraries include:
 - SlateJS
 - Redux
 - ReactRouter
 - Reactstrap
 - Material-UI
 - Nodemailer
 
### Inspiration

The inspiration for this site originated from the shutdown of lang-8's registration which barred new users from joining its community. Other forms of alternatives focused on more of a social media approach in which small posts are made. Gathering ideas as well as planning improvements for each, the best of each features are gathered to create a simple and efficient website with the sole-focus of improving one's foreign writing skills.

### Development & Process

A week before starting this project, I had little knowledge for how full-stack sites were created and much less of an idea for what the MEAN was. I found BradTraversy's tutorials and learned from several of his projects as well as jumped to multiple other tutorials. Finding that other stacks exists, I experimented and questioned the MEAN stack, eventually preferring the use of PostgreSQL and React for Fern.

### Challenges

Since I was still new to web development, especially in the Full Stack context, the majority of difficulties involved getting over the initial learning curve. Then after, main difficulties involved optimization and design decisions that appeals to user immersion.

Aside from the visual aspects, the code architecture for structuring components required a new approach for adding additional features since each feature must be scalable, efficient, and compatible with existing components.

Major technical challenges are listed below:
 - Protection and Usage of unique routes
 - Applications of using knex
 - Usage of redux
 - Selection-based edit implementation using SlateJS
 - Scalability

Major design challenges are listed below:
- Usage of paginations vs 'load more' vs infinite scroll/lazy load
- Layout of buttons vs floating action buttons
- Usage of collapsible components

### Further Improvements

#### Client-Side
Improvements involve replacing Material-UI with Semantic-UI's library due to the difficulties experienced when using Material-UI. Although Material-UI has a great visual library, the multitudes of heavy features seem overwhelming for a website of this scale. Due to Semantic-UI's features, a change in libraries would opt for a more user-friendly appearance.

Optimizations within route protection

#### Server-Side
Improvements involve reducing code used in accessing PostgreSQL's database. Reduction allows for a minor improvement in time-complexity.

### Reference

Minimal references used to learn and jump-start learning how to web develop

[BradTraversy](https://github.com/bradtraversy)
-Learned basics of MEAN and MERN stack

[BryceStPierre](https://github.com/BryceStPierre)
-Learned applications of React

[w3cj](https://github.com/w3cj)
-Learned how to apply PostgreSQL
