let MrkClientServiceClient = null;
let MrkAdminServiceClient = null;
const setThrift = async ({ THRIFT }) => {
  MrkClientServiceClient = new window.MrkClientServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-client-json`)
    )
  );
  MrkAdminServiceClient = new window.MrkAdminServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-admin-json`)
    )
  );
};

export {
  setThrift,
  MrkClientServiceClient,
  MrkAdminServiceClient
};