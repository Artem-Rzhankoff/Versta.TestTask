using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace Versta.TestTask.Common;

public interface ICrudRepository<TEntity> : IReadOnlyRepository<TEntity>
    where TEntity : IEntity
{
    Task<long> AddAsync(TEntity item, CancellationToken token);
    Task DeleteAsync(long id, CancellationToken token);
    Task UpdateAsync(long id, 
        Expression<Func<SetPropertyCalls<TEntity>, SetPropertyCalls<TEntity>>> setPropertyCalls,
        CancellationToken token);
}