using CLRSMSWEBAPI.FldrClass;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class AutoNumController : ControllerBase
    {

        [HttpGet]
        [Route("API/QCAWEBAPI/AutoNumber/GettblProfilingAutoNum")]
        public string GettblProfilingAutoNum()
        {
            return new ClsAutoNumber().GettblProfilingAutoNum();
        }
    }
}
