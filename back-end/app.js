const express = require("express");
const mongoose = require("mongoose");
const shortid = require('shortid');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = express.Router();

// --->> Models <<---
const userModel = require("./Model/userModel");
const formModel = require("./Model/formMode");
const responseModel = require("./Model/responseMode"); // Import the Response model

// --->> Express & bodyParser settings <<---
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --->> Mongoose connection <<---
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
    });


// --->> Logging incoming requests <<---
const logRequests = (req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
        const elapsedTime = Date.now() - startTime;
        const statusCode = res.statusCode;
        console.log(`${req.method} ${req.originalUrl} ${statusCode} - ${elapsedTime}ms`);
    });
    next();
};

// --->> User Route & API'S <<---
router.post("/form/addUser", async (req, res) => {
    try {
        await userModel.create(req.body);
        res.status(200).json({
            status: true,
            message: "Added successfully",
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
});

router.get("/form/getUser", async (req, res) => {
    try {
        let searchParameters = {};
        if (req.query.email != null) searchParameters.email = req.query.email;
        if (req.query.name != null) searchParameters.name = req.query.name;
        const userData = await userModel.find(searchParameters);
        res.status(201).json({
            status: true,
            data: userData,
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
});

router.get("/form/getUserForLogin", async (req, res) => {
    try {
        if (req.query.email != null && req.query.password != null) {
            const user = await userModel.findOne({ email: req.query.email, password: req.query.password });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                status: true,
                message: "Login successfully",
                user: user,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
});

router.get("/form/getPhoneUserForLogin", async (req, res) => {
    try {
        console.log("req.query.phoneNumber",req.query.phoneNumber)
        if (req.query.phoneNumber != null) {
            const user = await userModel.findOne({ phoneNumber: req.query.phoneNumber});
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                status: true,
                message: "Login successfully",
                user: user,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
});

// --->> Form Route & API'S <<---
router.post("/form/addForm", async (req, res) => {
    try {
        const uniqueLink = shortid.generate();
        req.body.uniqueLink = uniqueLink
        await formModel.create(req.body);
        res.status(200).json({
            status: true,
            message: "Form added successfully",
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: `Something went wrong`,
        });
    }
});

router.get("/form/getForm", async (req, res) => {
    let searchParameters = {}
    if (req.body.userId != null)
        searchParameters.userId = req.body.userId;
    const form = await formModel.find(searchParameters);
    res.status(201).json({
        status: true,
        data: form
    });
});

router.get("/form/:uniqueLink", async (req, res) => {
    const { uniqueLink } = req.params;
    try {
        const form = await formModel.findOne({ uniqueLink });
        if (form) {
            res.json({ data: form });
        } else {
            res.status(404).send('Form not found');
        }
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: `Something went wrong`,
        });
    }
})

router.delete("/form/deleteForm/:title", async (req, res) => {
    try {
        await formModel.findOneAndDelete({ title: req.params.title });
        res.status(201).json({
            status: true,
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error(error)
    }
});

app.use(logRequests);
app.use(router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        message: 'Something went wrong',
    });
});
// --->> Response Route & API'S <<---
// Add a new Response API endpoint to store responses
router.post("/form/addResponse", async (req, res) => {
    try {
        await responseModel.create(req.body);
        res.status(200).json({
            status: true,
            message: "Response added successfully",
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
});

// Add an API endpoint to fetch responses by formId
router.get("/form/getResponsesByFormId", async (req, res) => {
    try {
        const responses = await responseModel.find({ formId: req.query.formId });
        res.status(201).json({
            status: true,
            data: responses,
        });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
});
// Add a new API endpoint to submit responses
// Add a new API endpoint to fetch survey data by formId
router.get("/form/getSurveyData/:formId", async (req, res) => {
    try {
      const { formId } = req.params;
      // Fetch the survey data based on the formId
      const survey = await formModel.findOne({ _id: formId }); // Assuming _id is the identifier for your forms
      if (survey) {
        res.status(200).json({
          status: true,
          data: survey,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Survey not found",
        });
      }
    } catch (error) {
      console.error('Error fetching survey data:', error);
      res.status(500).json({
        status: false,
        message: 'Something went wrong',
      });
    }
  });
  
  // Add this new route to your existing Express router
  router.use("/form", router);
  // Add a new API endpoint to submit survey responses
router.post("/form/submitResponse", async (req, res) => {
    try {
        // You can handle the submission of survey responses here.
        // Assuming that `req.body` contains the response data.

        // Example: Save the response to the responseModel
        const response = await responseModel.create(req.body);

        res.status(200).json({
            status: true,
            message: "Survey response submitted successfully",
            response: response,
        });
    } catch (error) {
        console.error('Error submitting survey response:', error);
        res.status(500).json({
            status: false,
            message: 'Something went wrong',
        });
    }
});

  
// --->> Express server <<---
app.listen(process.env.PORT, () => {
    console.log(`Connected... listing on port ${process.env.PORT}`);
});
