const axiosMock = jest.genMockFromModule('axios');

let mockResponseAsArr = {
  data: [{
    id: 1,
    name: 'Test name',
    type: 'Test type',
    images: ['image_1.png', 'image_2.png']
  }]
};

let mockResponseAsObj = {
  data: {
    id: 1,
    name: 'Test name',
    type: 'Test type',
    images: ['image_1.png', 'image_2.png']
  }
};

function req_get(url) {
  switch (url) {
    case `${process.env.REACT_APP_API_URL}/catalog/1`:
      return new Promise((resolve) => {
        axiosMock.delayTimer = setTimeout(() => {
          resolve(mockResponseAsObj);
        }, 100);
      });
    case `${process.env.REACT_APP_API_URL}/partners`:
      return new Promise((resolve) => {
        axiosMock.delayTimer = setTimeout(() => {
          resolve(mockResponseAsArr);
        }, 100);
      });
    default:
      return Promise.reject(new Error('not found'))
  }
}

function req_post() {
  return new Promise((resolve) => {
    axiosMock.delayTimer = setTimeout(() => {
      resolve(mockResponseAsObj);
    }, 100)
  })
}

function req_all() {
  return new Promise((resolve) => {
    axiosMock.delayTimer = setTimeout(() => {
      resolve(mockResponseAsObj);
    }, 100)
  })
}

axiosMock.get.mockImplementation(req_get);
axiosMock.post.mockImplementation(req_post);
axiosMock.all.mockImplementation(req_all);

module.exports = axiosMock;
