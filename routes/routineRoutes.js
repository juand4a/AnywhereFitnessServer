const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/routineController");

router.post("/init", auth, controller.initRoutine);
router.get("/", auth, controller.getRoutine);

router.post("/days/:dayCode/exercises", auth, controller.addExercise);

router.put("/exercises/:id", auth, controller.updateExercise);
router.delete("/exercises/:id", auth, controller.deleteExercise);

module.exports = router;
