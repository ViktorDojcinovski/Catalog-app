const axiosMock = jest.genMockFromModule('axios');

let mockResponse = {
  data: [{
    "id": 1,
    "name": "Test name",
    "type": "Test type",
    "images": ["image_1.png", "image_2.png"]
  }]
}

axiosMock.get.mockImplementation(req);

function req() {
  return new Promise(function(resolve) {
    axiosMock.delayTimer = setTimeout(function() {
      resolve(mockResponse);
    }, 1000)
  })
}

module.exports = axiosMock;
