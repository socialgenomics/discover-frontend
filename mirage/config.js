export default function() {
  this.get('/stats', () => {
    return {
      "datasets": 1000,
      "datasources": 50,
      "repositive_collections": 10
    };
  });


  this.passthrough();
}
