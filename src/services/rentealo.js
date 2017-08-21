// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const RENTEALO_ENDPOINT = 'http://localhost:3004/properties';

class RedditService {

    async getDefaultSubreddits() {
      const url_rentealo = RENTEALO_ENDPOINT;

      const respuesta = await fetch(url_rentealo, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      if (!respuesta.ok) {
        throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${respuesta.status}`);
      }

      const dato = await respuesta.json();
      return _.map(dato, (subreddit) => {
        // abstract away the specifics of the reddit API response and take only the fields we care about
        console.log(subreddit.name)
        return {
          title: subreddit.name,
          description: subreddit.address,
          url: subreddit.price
        }
      });
    }


}

export default new RedditService();
