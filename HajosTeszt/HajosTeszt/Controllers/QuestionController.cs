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
    public class QuestionController : ControllerBase
    {

        [HttpGet]
        [Route("questions/count")]
        public int M1()
        {
            HajostesztContext context = new HajostesztContext();
            int KerdesekSzama = context.Questions.Count();
            return KerdesekSzama;
        }
    }
}
