import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import Helmet from "../../components/helmet/helmet";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import "../../styles/Login.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const singup = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `image/imges`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "Users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      setloading(false);
      console.log(user);
      toast.success("account added successfully");

      navigate("/home");
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet>
      <section className="login_page ">
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h6>loading..</h6>
              </Col>
            ) : (
              <Col lg="6  m-auto text-center form_box">
                <Form className="login_form  " onSubmit={singup}>
                  <h2 className=" fs-1 fw-1 my-4">Login</h2>
                  <FormGroup className="form_grp">
                    <div className="login_input_field">
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="name"
                        placeholder="enter your Username"
                        required
                      />
                      <span>
                        <i class="ri-user-line"></i>
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="form_grp">
                    <div className="login_input_field">
                      <input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        type="email"
                        placeholder="enter your email"
                      />
                      <span>
                      <i class="ri-mail-line"></i>
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup className="form_grp">
                    <div className="login_input_field">
                      <input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        placeholder="enter your password"
                      />
                      <span>
                        <i class="ri-lock-2-line"></i>
                      </span>
                    </div>
                  </FormGroup>

                  <button
                    style={{ width: "200px" }}
                    className="check_out_btn my-4"
                  >
                    Create Account
                  </button>
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "grey",
                    }}
                    to="/Login"
                  >
                    <motion.p whileTap={{ scale: 0.9 }}>
                      Already have an account? login
                    </motion.p>
                  </Link>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
    // <Helmet>
    //   <section classNameName="login_page mb-3">
    //     <Container>
    //       <Row>
    //         {loading ? (
    //           <Col lg="12" classNameName="text-center">
    //             <h4 classNameName="fs-2 fw-1">loading..</h4>
    //           </Col>
    //         ) : (
    //           <Col lg="6  m-auto text-center form_box">
    //             <Form classNameName="login_form" onSubmit={singup}>
    //               <h6 classNameName=" fs-1 fw-1 my-4">Signup</h6>
    //               <FormGroup classNameName="form_grp">
    //                 <div className="login_input_field">
    //                   <input
    //                     value={username}
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     type="name"
    //                     placeholder="enter your Username"
    //                     required
    //                   />
    //                   <span>
    //                     <i class="ri-user-line"></i>
    //                   </span>
    //                 </div>
    //               </FormGroup>
    //               <FormGroup classNameName="form_grp">
    //                 <div className="login_input_field">
    //                   <input
    //                     value={email}
    //                     onChange={(e) => setemail(e.target.value)}
    //                     type="email"
    //                     placeholder="enter your email"
    //                     required
    //                   />
    //                   <span>
    //                   <i class="ri-mail-line"></i>                      </span>
    //                 </div>
    //               </FormGroup>
    //               <FormGroup classNameName="form_grp">
    //                 <div className="login_input_field">
    //                   <input
    //                     value={password}
    //                     onChange={(e) => setpassword(e.target.value)}
    //                     type="password"
    //                     placeholder="enter your password"
    //                   />
    //                   <span>
    //                     <i class="ri-lock-2-line"></i>
    //                   </span>
    //                 </div>
    //               </FormGroup>

    //               <button
    //                 style={{ width: "200px" }}
    //                 classNameName="check_out_btn my-4"
    //               >
    //                 Create Account
    //               </button>
    //               <Link
    //                 style={{
    //                   textDecorationLine: "none",
    //                   color: "grey",
    //                 }}
    //                 to="/Login"
    //               >
    //                 <motion.p whileTap={{ scale: 0.9 }}>
    //                   Already have an account? login
    //                 </motion.p>
    //               </Link>
    //             </Form>
    //           </Col>
    //         )}
    //       </Row>
    //     </Container>
    //   </section>
    // </Helmet>
  );
};
export default Signup;
