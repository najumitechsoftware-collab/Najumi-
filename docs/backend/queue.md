Queue System (Orbit)

Najumi Orbit is the background job and queue processing system integrated into the Najumi.js backend.

In many applications, certain tasks should not block the main request-response cycle. Instead, they should run asynchronously in the background.

The queue system allows these tasks to be processed independently without slowing down user requests.

Orbit enables developers to schedule, queue and process background jobs efficiently while maintaining application performance.

---

Why Background Jobs Are Important

Many application tasks take time to complete and should not run during a user request.

Examples include:

- sending emails
- generating reports
- processing uploaded files
- data synchronization
- running scheduled maintenance tasks

If these tasks were processed directly during API requests, the server response time would increase significantly.

The queue system solves this problem by placing tasks into a job queue where workers process them asynchronously.

---

Queue Architecture

The Orbit system consists of several components that work together to process background jobs.

These components include:

Queue Manager
Responsible for managing job queues and storing pending tasks.

Worker Engine
Processes queued jobs and executes their associated tasks.

Scheduler
Handles scheduled jobs that run at specific times or intervals.

Retry System
Ensures failed jobs can be retried automatically.

Together, these components provide a reliable background processing system.

---

Creating a Job

Jobs represent tasks that should run in the background.

Example job definition:

export default {

  name: "sendEmail",

  async handle(data) {

    console.log("Sending email to:", data.email)

  }

}

This job defines a task that sends an email.

---

Dispatching Jobs

Jobs can be added to the queue from within the application.

Example:

await orbit.dispatch("sendEmail", {

  email: "user@example.com"

})

The job is placed into the queue and will be processed by a worker.

---

Job Processing

Workers continuously monitor the queue and process pending jobs.

Example worker process:

1. Retrieve a job from the queue.
2. Execute the job handler.
3. Mark the job as completed.

If the job fails, the retry system can attempt to run it again.

---

Scheduled Jobs

Orbit includes a scheduler that allows jobs to run automatically at specific times.

Example:

orbit.schedule("dailyReport", {

  cron: "0 0 * * *"

})

This example schedules a job to run every day at midnight.

Scheduled jobs are useful for tasks such as:

- generating analytics reports
- cleaning temporary data
- sending periodic notifications

---

Job Retry System

Sometimes jobs may fail due to temporary issues.

Orbit includes a retry system that automatically retries failed jobs.

Example configuration:

orbit.dispatch("sendEmail", data, {

  retries: 3

})

If the job fails, the system will attempt to run it again up to three times.

This improves reliability in distributed environments.

---

Queue Performance

Orbit is optimized to handle high volumes of background tasks.

The system focuses on:

- fast job dispatching
- efficient worker processing
- minimal overhead

This allows applications to process thousands of background jobs efficiently.

---

Distributed Queue Processing

Large applications may run multiple worker processes across several servers.

Orbit supports distributed job processing so that multiple workers can process jobs from the same queue.

This enables applications to scale background processing as workload increases.

---

Security Considerations

Background job systems must ensure that queued tasks cannot be abused or manipulated.

Orbit integrates with the framework's security layers to ensure:

- job data validation
- safe execution of job handlers
- controlled access to queue operations

These protections help maintain secure background processing.

---

Summary

Najumi Orbit provides a reliable and scalable background job processing system.

By allowing tasks to run asynchronously through queues, workers and schedulers, Orbit enables applications to perform complex operations without affecting request performance.

---

Next Step

Now that you understand the queue system, the next step is to explore the storage system used for managing files and assets.

Next: Storage System (Harbor)