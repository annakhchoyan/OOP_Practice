class Job {
    #jobTitle;
    #describtion;
    #requirements;
    #salary;
    #company;
    #applications;
    #status;

    constructor(jobTitle, description, requirements, salary, company) {
        this.#jobTitle = jobTitle;
        this.#describtion = description;
        this.#requirements = requirements;
        this.#salary = salary;
        this.#company = company;
        this.#applications = [];
        this.#status = "Open";
    }

    get jobTitle() {
        return this.#jobTitle;
    }

    get description() {
        return this.#describtion;
    }

    get requirements() {
        return this.#requirements;
    }

    get salary() {
        return this.#salary;
    }

    get company() {
        return this.#company;
    }

    get applications() {
        return this.#applications;
    }

    get status() {
        return this.#status;
    }

    application(user) {
        if(this.#status === "Open") {
            this.#applications.push(user);
        } else return ("Job application is closed.");
    }

    closeApplication() {
        this.#status = "Closed";
    }
}

class User {
    #name;
    #contact;
    #resume;
    #interests;

    constructor(name, contact, resume, interests) {
        this.#name = name;
        this.#contact = contact;
        this.#resume = resume;
        this.#interests = interests;
    }

    get name() {
        return this.#name;
    }

    get contact() {
        return this.#contact;
    }

    get resume() {
        return this.#resume;
    }

    get interests() {
        return this.#interests;
    }

    matchJob(job) {
        const jobDetails = [
            job.jobTitle.toLowerCase(),
            job.description.toLowerCase(),
            job.requirements.toLowerCase(),
            job.company.toLowerCase(),
        ];

        for (let interest of this.#interests) {
            if (jobDetails.includes(interest.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    notifyNewJob(job) {
        console.log(`Notification for ${this.name}:`);
        console.log(`New job matching your profile:`);
        console.log(`Job Title: ${job.jobTitle}`);
        console.log(`Company: ${job.company}`);
        console.log(`Salary: ${job.salary}`);
    }
}

class ManagementSystem {
    #jobOpenings;
    #users;

    constructor(jobOpening, users) {
        this.#jobOpenings = [];
        this.#users = [];
    }

    get jobOpenings() {
        return this.#jobOpenings;
    }

    get users() {
        return this.#users;
    }

    registerJobOpening(jobTitle, description, requirements, salary, company) {
        const job = new Job(jobTitle, description, requirements, salary, company);
        this.#jobOpenings.push(job);
        
        for (let user of this.#users) {
            if (user.matchJob(job)) {
                user.notifyNewJob(job);
            }
        }
    }

    registerUser(name, contact, resume, interests) {
        const user = new User(name, contact, resume, interests);
        this.#users.push(user);
        // return user;
    }

    searchJobs(criteria) {
        return this.#jobOpenings.filter(
            (job) =>
                job.status === "Open" &&
                (job.jobTitle.toLowerCase().includes(criteria.toLowerCase()) ||
                    job.description.toLowerCase().includes(criteria.toLowerCase()) ||
                    job.requirements.toLowerCase().includes(criteria.toLowerCase()) ||
                    job.company.toLowerCase().includes(criteria.toLowerCase()))
        );   
    }

    applicationToJob(userId, jobId) {
        const user = this.#users[userId];
        const job = this.#jobOpenings[jobId];

        if (job.status === "Open") {
            job.application(user);
            return true;
        }

        return false;
    }

    closeJob(jobId) {
        const job = this.#jobOpenings[jobId];
        job.closeApplication();
    }
}

const managementSystem = new ManagementSystem();

managementSystem.registerUser("Mark", "mark@gmail.com", "Resume1", ["software", "web development"]);
managementSystem.registerUser("Bob", "bob.@gmail.com", "Resume2", ["marketing", "social media"])
managementSystem.registerJobOpening("Software Engineer", "xxx", "xxxx", 100000, "A company");


const jobs = managementSystem.searchJobs("software");
console.log("Search Results:");

for (let job of jobs) {
    console.log(`Job Title: ${job.jobTitle}`);
    console.log(`Company: ${job.company}`);
    console.log(`Salary: ${job.salary}`);
}

const applicationSuccess = managementSystem.applicationToJob(0, 0);
console.log(`Applacation success: ${applicationSuccess}`);

managementSystem.closeJob(0);
console.log(`Job status after closing  applications: ${managementSystem.jobOpenings[0].status}`);

