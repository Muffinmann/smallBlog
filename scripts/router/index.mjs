class Router {
  constructor() {
    this.routes = [
      {
        path: '*',
        // method: '*',
        handle: function(req, res) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end('404');
        }
      }
    ];
  }
  use (path, handle) {
    this.routes.push({
      path,
      handle,
    });
  }

  match (reqPath, routePath) {
    if (!routePath.includes('/:')) return {
      match: reqPath === routePath,
      param: undefined,
    };

    const reqSegments = reqPath.split('/').filter(Boolean);
    const routeSegments = routePath.split('/').filter(Boolean);
    const routeParamKey = routeSegments.at(-1).slice(1);
    console.log('req seg = ', reqSegments);
    console.log('route seg = ', routeSegments)
    if (reqSegments.length !== routeSegments.length) return false;

    const reqPathParam = reqSegments[1];
    const res = reqPath.match(routeSegments[0]);
    return {
      match: res,
      param: {
        [routeParamKey]: reqPathParam
      }
    };
  }


  handle (req, res) {
    // console.log('req details = ', req.host)
    // const reqURL = new URL(req.path);
    const reqPath = req.url;
    // const reqMethod = req.method;
    for (let route of this.routes) {
      const {match, param} = this.match(reqPath, route.path);
      // console.log(reqPath, route.path, match)
      if (match) {
        const request = {...req, param};
        return route.handle(request, res);
      }
    }
    return this.routes[0].handle(req, res);
  }
}

export default Router;