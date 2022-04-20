using ProjectTest.DTOs;
using ProjectTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTest.Extension.Interface
{
    public interface IUsersRepository
    {
        void Insert<T>(T entity);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<MsUsers>> GetUsersAsync();

        Task<MsUsers> GetUserByUsernameAsync(string username);

        Task<MsUsers> GetUserByIdAsync(int id);

        Task<IEnumerable<UsersDto>> GetUsersDtoAsync();

        Task<UsersDto> GetUserDtoByEmailAsync(string email);

        Task<UsersDto> GetUserDtoByIdAsync(int id);
    }
}
