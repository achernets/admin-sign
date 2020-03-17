let MrkClientServiceClient = null;
let MrkUserServiceClient = null;
const setThrift = async ({ THRIFT }) => {
  MrkClientServiceClient = new window.MrkClientServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-client-json`)
    )
  );
  MrkUserServiceClient = new window.MrkUserServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-user-json`)
    )
  );
};

export {
  setThrift,
  MrkClientServiceClient,
  MrkUserServiceClient
};