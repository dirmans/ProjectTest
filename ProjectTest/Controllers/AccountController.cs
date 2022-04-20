using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTest.Data;
using ProjectTest.Data.Interface;
using ProjectTest.DTOs;
using ProjectTest.Model;
using System.Threading.Tasks;

namespace ProjectTest.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        private async Task<bool> UserExist(string username)
        {
            return await context.MsUsers.AnyAsync(x => x.Username.ToLower() == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<SessionDto>> Login(LoginDto loginDto)
        {
            var checkUser = await context.MsUsers.FirstOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

            // check if null
            if (checkUser != null)
            {
                var passwordHasher = new PasswordHasher<MsUsers>();
                var correctPassword = passwordHasher.VerifyHashedPassword(checkUser, checkUser.Password, loginDto.Password);

                if (correctPassword != PasswordVerificationResult.Success)
                {
                    return Unauthorized("Wrong password. Please check correctly.");
                }

                return new SessionDto
                {
                    Name = checkUser.Name,
                    Token = tokenService.CreateToken(checkUser)
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.Username))
                return BadRequest("User already exist.");

            MsUsers user = new();

            var passwordHasher = new PasswordHasher<MsUsers>();

            user.Name = registerDto.Name;
            user.Username = registerDto.Username;
            user.Password = passwordHasher.HashPassword(user, registerDto.Password);

            await context.AddAsync(user);

            if (await context.SaveChangesAsync() > 0)
                return NoContent();

            return BadRequest("Failed insert user.");
        }
    }
}