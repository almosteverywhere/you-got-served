new Server([
  {
    route:"/cats/:id/",
    type:"get"
    fn:function(request, response) {
      request.params['id']
    }
  }
])