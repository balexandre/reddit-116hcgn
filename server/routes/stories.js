// #######################################################################
// routes > stories.js

const router = require('express').Router();
const { validate } = require('openapi-validator-middleware');

const { stories } = require('../engines');
const { deleteStory, deleteEventById } = require('../engines/stories');

const {
  getStoryById, getAllStories, getEventsByStoryId, addStory, addEventToStoryId,
} = stories;

router.get('/', validate, async (req, res) => res.json(await getAllStories(req.query)));
router.post('/', validate, async (req, res) => res.json(await addStory(req.body)));

router.get('/:id', validate, async (req, res) => res.json(await getStoryById(req.params.id)));
router.delete('/:id', validate, async (req, res) => res.json(await deleteStory(req.params.id)));

router.get('/:id/events', validate, async (req, res) => res.json(await getEventsByStoryId(req.params.id)));
router.post('/:id/events', validate, async (req, res) => res.json(await addEventToStoryId(req.params.id, req.body)));
router.delete('/:id/events/:evtId', validate, async (req, res) => res.json(await deleteEventById(req.params.id, req.params.evtId)));

module.exports = router;
