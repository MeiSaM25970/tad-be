const commentsRepo = require("../../dal/comments.repo");
const mongoDb = require("mongodb");
const moment = require("moment-jalaali");
const weblogRepo = require("../../dal/weblog.repo");

const commentsController = {
  fetchAll: (req, res) => {
    commentsRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  create: async (req, res) => {
    const comment = req.body;
    await weblogRepo.findById(comment.weblogId, async (err, data) => {
      if (err) {
        await res.status(404).send({ msg: "وبلاگ مورد نظر پیدا نشد" });
      } else {
        comment.weblogTitle = data.title;
        comment.date = moment().format("YYYY/MM/DD HH:mm:ss");
        comment.status = "new";
        await commentsRepo.create(comment, (err, data) => {
          if (err) res.status(500).send(err);
          else res.send(data);
        });
      }
    });
  },
  findById: (req, res) => {
    const commentId = req.params.id;
    commentsRepo.findById(commentId, (err, comment) => {
      if (err) res.status(500).send(err);
      else {
        res.send(comment);
      }
    });
  },
  filterByWeblogId: (req, res) => {
    const weblogId = req.params.id;
    commentsRepo.filterByWeblogId(weblogId, (err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  update: async (req, res) => {
    var newComment = req.body;
    const commentId = req.params.id;
    if (newComment.answer) {
      await commentsRepo.findById(commentId, async (err, comment) => {
        if (err) res.status(500).send(err);
        else {
          delete comment.answer;
          newComment = {
            ...newComment,
            ...comment,
          };
        }
        newComment.answer.answerDate = moment().format("YYYY/MM/DD HH:mm");
        const weblogObjId = new mongoDb.ObjectID(newComment.weblogId);
        newComment.weblogId = weblogObjId;
        delete newComment._id;
        newComment.status = "accept";
        await commentsRepo.update(
          commentId,
          newComment,
          async (err, result) => {
            if (err) res.status(500).send(err);
            else res.send(result);
          }
        );
      });
    } else {
      const weblogObjId = new mongoDb.ObjectID(newComment.weblogId);
      newComment.weblogId = weblogObjId;
      delete newComment._id;
      await commentsRepo.update(commentId, newComment, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
      });
    }
  },
  delete: (req, res) => {
    const commentId = req.params.id;
    commentsRepo.delete(commentId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = commentsController;
