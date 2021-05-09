using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projektek.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projektek.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdések = from x in context.Questions select x.QuestionText;

            return new JsonResult(kérdések);
        }

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int sorszám)
        {
            HajostesztContext context = new HajostesztContext();
            var kérdés = (from x in context.Questions
                          where x.QuestionId == sorszám
                          select x).FirstOrDefault();

            if (kérdés == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(kérdés);
        }

        [HttpGet]
        [Route("questions/last")]
        public ActionResult M3()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdés = (from x in context.Questions
                          orderby x.QuestionId ascending
                          select x).LastOrDefault();

            if (kérdés == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(kérdés);
        }

        [HttpGet]
        [Route("questions/first")]
        public ActionResult M4()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdés = (from x in context.Questions
                          orderby x.QuestionId descending
                          select x).LastOrDefault();

            if (kérdés == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(kérdés);
        }

        [HttpGet]
        [Route("questions/next/{sorszam}")]
        public ActionResult M5(int sorszam)
        {
            HajostesztContext context = new HajostesztContext();
            var kérdésKöv = (from x in context.Questions
                             where sorszam < x.QuestionId
                             orderby x.QuestionId ascending
                             select x).FirstOrDefault();

            if (kérdésKöv == null) return M4();

            return new JsonResult(kérdésKöv);
        }

        [HttpGet]
        [Route("questions/prev/{sorszam}")]
        public ActionResult M6(int sorszam)
        {
            HajostesztContext context = new HajostesztContext();
            var kérdésElőző = (from x in context.Questions
                               where sorszam > x.QuestionId
                               orderby x.QuestionId descending
                               select x).FirstOrDefault();

            if (kérdésElőző == null) return M3();

            return new JsonResult(kérdésElőző);
        }
    }
}
