class Controller {
  findSuccess(res) {
    return (result) => {
      res.status(200);  // OK
      res.json(result);
    };
  }
  
  findError(res) {
    return (error) => {
      res.status(404);  // Not Found
      res.json(error);
    };
  }
  
  createSuccess(res) {
    return (result) => {
      res.status(200);
      res.json(result);
    };
  }
  
  deleteError(res) {
    return (error) => {
      res.status(404);  // Not Found
      res.json(error);
    };
  }
  
  editSuccess(res) {
    return (result) => {
      res.status(204);  // No Content
      res.json(result);
    };
  }
  
  editError(res) {
    return (error) => {
      res.status(500);  // Internal Server Error
      res.json(error);
    };
  }
}

module.exports = Controller;
