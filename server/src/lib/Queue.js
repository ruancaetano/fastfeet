import Bee from 'bee-queue';

import redisConfig from '../config/redis';
import NewOrderEmailJob from '../app/jobs/NewOrderEmailJob';

const jobsTypes = [NewOrderEmailJob];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobsTypes.forEach(jobType => {
      this.queues[jobType.key] = new Bee(jobType.key, {
        redis: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
      });
    });
  }

  addJob(job, data) {
    return this.queues[job.key].createJob(data).save();
  }

  proccess() {
    jobsTypes.forEach(jobType => {
      this.queues[jobType.key].process(jobType.handle);
    });
  }
}

export default new Queue();
