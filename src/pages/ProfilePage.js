import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {getProfile, updatePassword, updateProfile} from "../network/userNet";
import LodaingSpinner from "../components/LodaingSpinner";
import {motion} from "framer-motion";

function ProfilePage() {
  const [dataUser, setDatauser] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newTelegram, setNewTelegram] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [key, setKey] = useState("home");
  useEffect(() => {
    getProfile().then(function (response) {
      console.log(response.data.user);

      setDatauser(() => {
        return response.data.user;
      });
      setNewName(() => {
        return response.data.user.name;
      });
      setNewEmail(() => {
        return response.data.user.email;
      });
      setNewPhone(() => {
        return response.data.user.phone;
      });
      setNewAddress(() => {
        return response.data.user.address;
      });
      setNewTelegram(() => {
        return response.data.user.telegram_id;
      });
      setSpinner(false);
    });
    setSpinner(false);
  }, []);

  const updatePassword1 = () => {
    const data = {
      type: 4,
      data: oldPassword + "||" + newPassword,
    };
    updatePassword(data).then(function (response) {
      console.log(response.data);
      alert("success");
    });
  };
  const updateData = () => {
    const data = {
      name: newName,
      email: newEmail,
      phone: newPhone,
      address: newAddress,
      telegram_id: newTelegram,
    };
    updateProfile(data).then(function (response) {
      console.log(response.data);
      alert("success");
    });
  };

  return (
    <>
      <div className="profile_container">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.7}}
          >
            <div class="col-lg-12">
              <div class="card mb-4">
                <h2
                  style={{textAlign: "center", width: "100%", margin: "20px 0"}}
                >
                  معلوماتي الشخصية
                </h2>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{dataUser.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{dataUser.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile_container_edit_info col-lg-12">
              <div class="col-lg-12">
                <div class="card mb-4">
                  <h2
                    style={{
                      textAlign: "center",
                      width: "100%",
                      margin: "20px 0",
                    }}
                  >
                    تحديث معلوماتي الشخصية{" "}
                  </h2>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Full Name</p>
                      </div>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={newName}
                          onChange={e => setNewName(e.target.value)}
                          aria-describedby="emailHelp"
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Email</p>
                      </div>
                      <div class="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={newEmail}
                          onChange={e => setNewEmail(e.target.value)}
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Phone</p>
                      </div>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={newPhone}
                          onChange={e => setNewPhone(e.target.value)}
                          aria-describedby="emailHelp"
                          placeholder="Enter your number phone"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Id telegram</p>
                      </div>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          value={newTelegram}
                          onChange={e => setNewTelegram(e.target.value)}
                          placeholder="Enter your id telegram"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Address</p>
                      </div>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={newAddress}
                          onChange={e => setNewAddress(e.target.value)}
                          aria-describedby="emailHelp"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <button
                        onClick={updateData}
                        type="submit"
                        name="submit"
                        value="edit-user"
                        className="btn btn-primary"
                      >
                        تحديث البيانات
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-12" style={{textAlign: "center"}}>
                <div class="card mb-4">
                  <div class="card-body">
                    <h1> تغيير كلمة المرور الحالية</h1>
                    <span>
                      الرجاء إدخال كلمة المرور الحالية أولاً ، ثم إدخال كلمة
                      المرور الجديدة
                    </span>
                    <div class="row" style={{width: "100%", margin: "10px 0"}}>
                      <div class="col-sm-9" style={{width: "100%"}}>
                        <input
                          type="password"
                          className="form-control"
                          value={oldPassword}
                          onChange={e => setOldPassword(e.target.value)}
                          aria-describedby="oldPassword"
                          placeholder="كلمة السر  الحالية"
                          style={{width: "100%"}}
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row" style={{width: "100%", margin: "10px 0"}}>
                      <div class="col-sm-9" style={{width: "100%"}}>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          aria-describedby="newPassword"
                          placeholder="ادخل كلمة السر الجديدة"
                          style={{width: "100%"}}
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row" style={{width: "100%", margin: "10px 0"}}>
                      <div class="col-sm-9" style={{width: "100%"}}>
                        <input
                          type="password"
                          name="rPassword"
                          className="form-control"
                          placeholder="قم بتأكيد كلمة المرور الجديدة"
                          required
                          style={{width: "100%"}}
                        />
                      </div>
                    </div>

                    <hr />
                    <div class="row">
                      <button
                        onClick={updatePassword1}
                        type="submit"
                        name="submit"
                        value="new-password"
                        className="btn btn-primary"
                      >
                        تغيير كلمة المرور
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
